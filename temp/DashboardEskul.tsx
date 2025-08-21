import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Download, Plus, UserPlus, Save, Upload, CalendarDays, FileText, ListChecks, GraduationCap, Bell } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

// ---- Utilities ----
const STORAGE_KEY = "eskul_dashboard_state_v1";
const todayISO = () => new Date().toISOString().slice(0, 10);
const formatTime = (str) => str; // keep HH:MM as-is
const defaultKKM = 75;

// Day names for schedule selection (ID)
const DAYS = [
  { value: "1", label: "Senin" },
  { value: "2", label: "Selasa" },
  { value: "3", label: "Rabu" },
  { value: "4", label: "Kamis" },
  { value: "5", label: "Jumat" },
  { value: "6", label: "Sabtu" },
  { value: "0", label: "Minggu" },
];

// Seed syllabus (12 minggu)
const seedSyllabus = [
  { week: 1, topic: "Orientasi, Setup, Dasar HTML", done: false },
  { week: 2, topic: "HTML Semantik & Aksesibilitas", done: false },
  { week: 3, topic: "CSS Dasar: Layout, Flexbox", done: false },
  { week: 4, topic: "CSS Lanjutan: Grid & Responsive", done: false },
  { week: 5, topic: "Dasar JavaScript: Variabel, Tipe, DOM", done: false },
  { week: 6, topic: "JS: Event, Array, Function", done: false },
  { week: 7, topic: "Mini Project 1: Landing Page", done: false },
  { week: 8, topic: "Git & GitHub Workflow", done: false },
  { week: 9, topic: "JS: Fetch API & JSON", done: false },
  { week: 10, topic: "Mini Project 2: App sederhana (ToDo / Quiz)", done: false },
  { week: 11, topic: "Deploy ke Vercel/Netlify", done: false },
  { week: 12, topic: "Showcase & Penilaian Akhir", done: false },
];

const seedState = {
  classes: {
    XI: {
      label: "Kelas XI",
      dayOfWeek: "6", // default Sabtu (ubah di Settings)
      time: { start: "09:30", end: "11:30" },
      students: [], // {id,name}
      attendance: {}, // by date: { studentId: true/false }
      syllabus: seedSyllabus.map((s) => ({ ...s })),
      scores: {}, // { studentId: { [topicOrProj]: number } }
    },
    X: {
      label: "Kelas X",
      dayOfWeek: "6", // default Sabtu (ubah di Settings)
      time: { start: "13:00", end: "15:00" },
      students: [],
      attendance: {},
      syllabus: seedSyllabus.map((s) => ({ ...s })),
      scores: {},
    },
  },
  settings: {
    kkm: defaultKKM,
    weights: { quiz: 20, tugas: 40, proyek: 40 },
    onlyMentorAccess: true,
    language: "id",
    theme: "light",
    offlineMode: true,
    notifications: { email: false, wa: true, telegram: false },
  },
  materials: [
    // { id, title, type: 'link'|'file'|'video', url, notes }
  ],
  // for charts
  attendanceTrend: [
    // { date, X: %, XI: % }
  ],
};

function usePersistentState(initial) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}

function percent(num, den) { return den === 0 ? 0 : Math.round((num / den) * 100); }

function classAttendanceToday(cls) {
  const date = todayISO();
  const att = cls.attendance[date] || {};
  const total = cls.students.length;
  const present = Object.values(att).filter(Boolean).length;
  return { present, total, pct: percent(present, total) };
}

function nextSession(dayOfWeek, startTime) {
  const now = new Date();
  const currentDow = now.getDay();
  let daysToAdd = (Number(dayOfWeek) - currentDow + 7) % 7;
  if (daysToAdd === 0) {
    // if time already passed today, push to next week
    const [h, m] = startTime.split(":" ).map(Number);
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
    if (now >= startToday) daysToAdd = 7;
  }
  const next = new Date(now);
  next.setDate(now.getDate() + daysToAdd);
  return next.toISOString().slice(0,10);
}

// ---- Export helpers ----
function exportCSV(filename, rows) {
  const processRow = (row) => row.map((val) => `"${String(val).replaceAll('"', '""')}"`).join(",");
  const csv = [rows[0].map(h=>h.toUpperCase()).join(","), ...rows.slice(1).map(processRow)].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}

// ---- Main Component ----
export default function DashboardEskul() {
  const [data, setData] = usePersistentState(seedState);
  const [activeClass, setActiveClass] = useState("XI");
  const cls = data.classes[activeClass];

  // Derived
  const attXI = classAttendanceToday(data.classes.XI);
  const attX = classAttendanceToday(data.classes.X);
  const syllabusProgress = (cls.syllabus.filter(s=>s.done).length / cls.syllabus.length) * 100;

  // Handlers
  const addStudent = (name) => {
    if (!name) return;
    setData((prev) => {
      const id = crypto.randomUUID();
      const students = [...prev.classes[activeClass].students, { id, name }];
      return { ...prev, classes: { ...prev.classes, [activeClass]: { ...prev.classes[activeClass], students } } };
    });
  };

  const markAttendance = (studentId, value) => {
    const date = todayISO();
    setData((prev) => {
      const clsPrev = prev.classes[activeClass];
      const dayAtt = { ...(clsPrev.attendance[date] || {}) , [studentId]: value };
      const attendance = { ...clsPrev.attendance, [date]: dayAtt };
      // update trend
      const present = Object.values(dayAtt).filter(Boolean).length;
      const total = clsPrev.students.length || 1;
      const pct = percent(present, total);
      const trend = [...prev.attendanceTrend.filter(d => d.date !== date), { date, [activeClass]: pct, ...(activeClass === 'XI' ? { X: (prev.attendanceTrend.find(d=>d.date===date)?.X ?? undefined) } : { XI: (prev.attendanceTrend.find(d=>d.date===date)?.XI ?? undefined) }) }];
      return { ...prev, classes: { ...prev.classes, [activeClass]: { ...clsPrev, attendance } }, attendanceTrend: trend };
    });
  };

  const toggleSyllabus = (week) => {
    setData((prev)=>{
      const clsPrev = prev.classes[activeClass];
      const syllabus = clsPrev.syllabus.map(s => s.week === week ? { ...s, done: !s.done } : s);
      return { ...prev, classes: { ...prev.classes, [activeClass]: { ...clsPrev, syllabus } } };
    });
  };

  const addMaterial = (payload) => {
    setData((prev)=> ({ ...prev, materials: [{ id: crypto.randomUUID(), ...payload }, ...prev.materials ] }));
  };

  const saveSettings = (patch) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const exportAttendance = () => {
    const date = todayISO();
    const rows = [["kelas","tanggal","nama","hadir"]];
    Object.entries(data.classes).forEach(([k, c])=>{
      const att = c.attendance[date] || {};
      c.students.forEach(st => rows.push([k, date, st.name, att[st.id] ? "ya" : "tidak"]));
    });
    exportCSV(`kehadiran_${date}.csv`, rows);
  };

  const nextXI = nextSession(data.classes.XI.dayOfWeek, data.classes.XI.time.start);
  const nextX = nextSession(data.classes.X.dayOfWeek, data.classes.X.time.start);

  // Form states
  const [newStudentName, setNewStudentName] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [materialType, setMaterialType] = useState("link");

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Eskul Programming</h1>
          <p className="text-sm text-muted-foreground">Mentor view · Bahasa Indonesia · Mode terang</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}><FileText className="w-4 h-4 mr-2"/>Cetak/Save PDF</Button>
          <Button onClick={exportAttendance}><Download className="w-4 h-4 mr-2"/>Export Kehadiran (hari ini)</Button>
        </div>
      </header>

      {/* Top widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Kehadiran Hari Ini — XI</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{attXI.pct}%</div>
            <div className="text-sm text-muted-foreground">{attXI.present}/{data.classes.XI.students.length} hadir</div>
            <div className="text-xs mt-2 flex items-center gap-1"><CalendarDays className="w-3 h-3"/>Sesi berikutnya: {nextXI}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Kehadiran Hari Ini — X</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{attX.pct}%</div>
            <div className="text-sm text-muted-foreground">{attX.present}/{data.classes.X.students.length} hadir</div>
            <div className="text-xs mt-2 flex items-center gap-1"><CalendarDays className="w-3 h-3"/>Sesi berikutnya: {nextX}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Progress Silabus — {data.classes[activeClass].label}</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{Math.round(syllabusProgress)}%</div>
            <div className="text-sm text-muted-foreground">{data.classes[activeClass].syllabus.filter(s=>s.done).length}/{data.classes[activeClass].syllabus.length} topik selesai</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Catatan Cepat</CardTitle></CardHeader>
          <CardContent>
            <Textarea placeholder="Tulis catatan pengajar untuk sesi berikutnya..." />
            <div className="text-xs text-muted-foreground mt-2">Tips: gunakan untuk checklist alat/link, kendala minggu ini, dll.</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
            <TabsTrigger value="syllabus">Silabus</TabsTrigger>
            <TabsTrigger value="materials">Materi & Modul</TabsTrigger>
            <TabsTrigger value="students">Siswa</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Label className="text-xs">Kelas aktif</Label>
            <Select value={activeClass} onValueChange={setActiveClass}>
              <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="XI">XI</SelectItem>
                <SelectItem value="X">X</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Trend Kehadiran (%)</CardTitle></CardHeader>
              <CardContent style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.attendanceTrend} margin={{ left: 0, right: 8 }}>
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis domain={[0, 100]} fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="XI" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="X" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Distribusi Progress Silabus</CardTitle></CardHeader>
              <CardContent style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { kelas: "XI", progress: Math.round((data.classes.XI.syllabus.filter(s=>s.done).length / data.classes.XI.syllabus.length) * 100) },
                    { kelas: "X", progress: Math.round((data.classes.X.syllabus.filter(s=>s.done).length / data.classes.X.syllabus.length) * 100) },
                  ]}>
                    <XAxis dataKey="kelas" fontSize={12} />
                    <YAxis domain={[0,100]} fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="progress" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ATTENDANCE */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Input Kehadiran — {data.classes[activeClass].label} (Hari ini)</CardTitle>
              <div className="text-sm text-muted-foreground">Tanggal: {todayISO()}</div>
            </CardHeader>
            <CardContent className="space-y-3">
              {cls.students.length === 0 && (
                <div className="text-sm text-muted-foreground">Belum ada siswa. Tambahkan di tab "Siswa" atau cepat di bawah.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {cls.students.map((s) => {
                  const date = todayISO();
                  const checked = cls.attendance[date]?.[s.id] ?? false;
                  return (
                    <label key={s.id} className="flex items-center justify-between border rounded-xl p-3">
                      <span className="text-sm font-medium">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Hadir</span>
                        <Checkbox checked={!!checked} onCheckedChange={(v)=>markAttendance(s.id, !!v)} />
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="flex gap-2 pt-2">
                <Input placeholder="Tambah siswa cepat: Nama" value={newStudentName} onChange={(e)=>setNewStudentName(e.target.value)} />
                <Button onClick={()=>{ addStudent(newStudentName); setNewStudentName(""); }}><UserPlus className="w-4 h-4 mr-2"/>Tambah</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SYLLABUS */}
        <TabsContent value="syllabus" className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Silabus — {data.classes[activeClass].label}</CardTitle>
              <Badge variant="secondary">Target 12 Minggu · KKM {data.settings.kkm}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {cls.syllabus.map((s) => (
                  <div key={s.week} className="flex items-center justify-between border rounded-xl p-3">
                    <div>
                      <div className="font-medium">Minggu {s.week}. {s.topic}</div>
                      <div className="text-xs text-muted-foreground">Checklist saat materi selesai</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Selesai</span>
                      <Checkbox checked={s.done} onCheckedChange={()=>toggleSyllabus(s.week)} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MATERIALS */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Tambah Materi / Modul</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input className="md:col-span-1" placeholder="Judul" value={materialTitle} onChange={(e)=>setMaterialTitle(e.target.value)} />
                <Select value={materialType} onValueChange={setMaterialType}>
                  <SelectTrigger><SelectValue placeholder="Tipe"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>
                <Input className="md:col-span-2" placeholder="URL / path" value={materialUrl} onChange={(e)=>setMaterialUrl(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button onClick={()=>{ if(materialTitle){ addMaterial({ title: materialTitle, type: materialType, url: materialUrl, notes: "" }); setMaterialTitle(""); setMaterialUrl(""); } }}>
                  <Plus className="w-4 h-4 mr-2"/>Simpan Materi
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.materials.length === 0 ? (
              <Card><CardContent className="p-6 text-sm text-muted-foreground">Belum ada materi. Tambahkan di atas.</CardContent></Card>
            ) : data.materials.map((m)=> (
              <Card key={m.id}>
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><FileText className="w-4 h-4"/>{m.title}</CardTitle></CardHeader>
                <CardContent className="text-sm">
                  <div className="flex items-center gap-2 mb-2"><Badge variant="outline">{m.type}</Badge></div>
                  {m.url && <a className="underline text-primary" href={m.url} target="_blank" rel="noreferrer">Buka</a>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* STUDENTS */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Kelola Siswa — {data.classes[activeClass].label}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=>{
                  // Export list siswa
                  const rows = [["kelas","nama"]];
                  cls.students.forEach(st => rows.push([activeClass, st.name]));
                  exportCSV(`siswa_${activeClass}.csv`, rows);
                }}><Download className="w-4 h-4 mr-2"/>Export</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Nama siswa" value={newStudentName} onChange={(e)=>setNewStudentName(e.target.value)} />
                <Button onClick={()=>{ addStudent(newStudentName); setNewStudentName(""); }}><UserPlus className="w-4 h-4 mr-2"/>Tambah</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {cls.students.map((s)=> (
                  <div key={s.id} className="flex items-center justify-between border rounded-xl p-3">
                    <span className="text-sm font-medium">{s.name}</span>
                    <Button size="sm" variant="ghost" onClick={()=>{
                      setData((prev)=>{
                        const clsPrev = prev.classes[activeClass];
                        const students = clsPrev.students.filter(x=>x.id!==s.id);
                        return { ...prev, classes: { ...prev.classes, [activeClass]: { ...clsPrev, students } } };
                      });
                    }}>Hapus</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SETTINGS */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Jadwal & Preferensi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Hari Kelas XI</Label>
                  <Select value={data.classes.XI.dayOfWeek} onValueChange={(v)=>{
                    setData((prev)=>({ ...prev, classes: { ...prev.classes, XI: { ...prev.classes.XI, dayOfWeek: v } } }));
                  }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DAYS.map(d=> <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Waktu XI</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={data.classes.XI.time.start} onChange={(e)=>setData(prev=>({ ...prev, classes: { ...prev.classes, XI: { ...prev.classes.XI, time: { ...prev.classes.XI.time, start: e.target.value } } } }))} />
                    <Input value={data.classes.XI.time.end} onChange={(e)=>setData(prev=>({ ...prev, classes: { ...prev.classes, XI: { ...prev.classes.XI, time: { ...prev.classes.XI.time, end: e.target.value } } } }))} />
                  </div>
                </div>
                <div className="border-l md:pl-4">
                  <Label>KKM</Label>
                  <Input type="number" value={data.settings.kkm} onChange={(e)=>saveSettings({ kkm: Number(e.target.value || defaultKKM) })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Hari Kelas X</Label>
                  <Select value={data.classes.X.dayOfWeek} onValueChange={(v)=>{
                    setData((prev)=>({ ...prev, classes: { ...prev.classes, X: { ...prev.classes.X, dayOfWeek: v } } }));
                  }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DAYS.map(d=> <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Waktu X</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={data.classes.X.time.start} onChange={(e)=>setData(prev=>({ ...prev, classes: { ...prev.classes, X: { ...prev.classes.X, time: { ...prev.classes.X.time, start: e.target.value } } } }))} />
                    <Input value={data.classes.X.time.end} onChange={(e)=>setData(prev=>({ ...prev, classes: { ...prev.classes, X: { ...prev.classes.X, time: { ...prev.classes.X.time, end: e.target.value } } } }))} />
                  </div>
                </div>
                <div className="border-l md:pl-4">
                  <Label>Bobot Penilaian</Label>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="text-xs">Quiz</div>
                    <Input type="number" value={data.settings.weights.quiz} onChange={(e)=>saveSettings({ weights: { ...data.settings.weights, quiz: Number(e.target.value||0) } })} />
                    <div className="text-xs text-muted-foreground">%</div>
                    <div className="text-xs">Tugas</div>
                    <Input type="number" value={data.settings.weights.tugas} onChange={(e)=>saveSettings({ weights: { ...data.settings.weights, tugas: Number(e.target.value||0) } })} />
                    <div className="text-xs text-muted-foreground">%</div>
                    <div className="text-xs">Proyek</div>
                    <Input type="number" value={data.settings.weights.proyek} onChange={(e)=>saveSettings({ weights: { ...data.settings.weights, proyek: Number(e.target.value||0) } })} />
                    <div className="text-xs text-muted-foreground">%</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Pastikan total 100%.</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Notifikasi</Label>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <label className="flex items-center gap-2"><Checkbox checked={data.settings.notifications.wa} onCheckedChange={(v)=>saveSettings({ notifications: { ...data.settings.notifications, wa: !!v } })}/> WhatsApp</label>
                    <label className="flex items-center gap-2"><Checkbox checked={data.settings.notifications.telegram} onCheckedChange={(v)=>saveSettings({ notifications: { ...data.settings.notifications, telegram: !!v } })}/> Telegram</label>
                    <label className="flex items-center gap-2"><Checkbox checked={data.settings.notifications.email} onCheckedChange={(v)=>saveSettings({ notifications: { ...data.settings.notifications, email: !!v } })}/> Email</label>
                  </div>
                  <div className="text-xs text-muted-foreground">(Placeholder, integrasi bisa ditambahkan nanti)</div>
                </div>
                <div>
                  <Label>Mode Offline</Label>
                  <div className="mt-2"><Checkbox checked={data.settings.offlineMode} onCheckedChange={(v)=>saveSettings({ offlineMode: !!v })}/> <span className="text-sm">Simpan lokal (localStorage)</span></div>
                </div>
                <div>
                  <Label>Akses</Label>
                  <div className="mt-2 text-sm">Hanya mentor (tanpa login). Untuk multi user, nanti bisa tambah auth.</div>
                </div>
              </div>
              <div className="pt-2"><Button><Save className="w-4 h-4 mr-2"/>Simpan Preferensi</Button></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="text-xs text-muted-foreground pt-6">© {new Date().getFullYear()} Dashboard Eskul · Data tersimpan lokal di peramban Anda. Siap diintegrasikan dengan Google Sheets/Supabase jika dibutuhkan.</footer>
    </div>
  );
}
