import { useState } from "react";

export default function App() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  const items: Item[] = [
    { id: "fld-1", type: "folder", name: "CryptoShepherds", updated: "2026-01-20", members: 5, label: "扉共有", color: "indigo" },
    { id: "fld-2", type: "folder", name: "TOBARI Design", updated: "2026-01-22", members: 3, label: "E2EE", color: "teal" },
    { id: "doc-1", type: "file", name: "Pitch_Deck.pdf", ext: "pdf", size: "4.2 MB", updated: "2026-01-18", label: "条件付き", color: "cyan" },
    { id: "doc-2", type: "file", name: "Product_PRD.md", ext: "md", size: "32 KB", updated: "2026-01-26", label: "E2EE", color: "indigo" },
    { id: "doc-3", type: "file", name: "Arweave_Access_Policy.json", ext: "json", size: "6 KB", updated: "2026-01-21", label: "条件付き", color: "teal" },
  ];

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      {/* Topbar */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="w-7 h-7" />
            <div className="text-xl font-bold tracking-wide">TOBARI</div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">beta</span>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="検索（ファイル名・拡張子・ラベル）" className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"/>
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">新規</button>
            <button className="rounded-xl bg-gradient-to-r from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9] text-white px-3 py-2 text-sm shadow-sm">アップロード</button>
            <Avatar/>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3 xl:col-span-2">
          <nav className="space-y-1">
            <SideLink label="マイドライブ" active icon={<DriveIcon/>}/>
            <SideLink label="共有" icon={<ShareIcon/>}/>
            <SideLink label="リクエスト" icon={<KeyholeIcon/>}/>
            <SideLink label="最近" icon={<ClockIcon/>}/>
            <SideLink label="アーカイブ" icon={<ArchiveIcon/>}/>
            <SideLink label="ゴミ箱" icon={<TrashIcon/>}/>
            <div className="pt-4 text-xs font-medium text-slate-500">ワークスペース</div>
            <div className="mt-1 space-y-1">
              <SideLink label="CryptoShepherds" icon={<TeamIcon/>}/>
              <SideLink label="暗号屋" icon={<TeamIcon/>}/>
            </div>
          </nav>
          <div className="mt-8 p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-sm font-medium mb-2">ストレージ</div>
            <div className="h-2 w-full rounded bg-slate-100 overflow-hidden">
              <div className="h-full w-[42%] bg-gradient-to-r from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9]"></div>
            </div>
            <div className="mt-2 text-xs text-slate-500">42% 使用中（21.0 / 50 GB）</div>
            <button className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">プランを確認</button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-9 xl:col-span-10">
          <div className="flex items-center justify-between">
            <Breadcrumb segments={["マイドライブ", "Projects"]}/>
            <div className="flex items-center gap-2">
              <button onClick={()=>setView("grid")} className={`rounded-lg px-2.5 py-2 text-sm border ${view==='grid'?'bg-slate-900 text-white border-slate-900':'border-slate-200 bg-white hover:bg-slate-50'}`}>グリッド</button>
              <button onClick={()=>setView("list")} className={`rounded-lg px-2.5 py-2 text-sm border ${view==='list'?'bg-slate-900 text-white border-slate-900':'border-slate-200 bg-white hover:bg-slate-50'}`}>リスト</button>
              <button className="rounded-lg px-2.5 py-2 text-sm border border-slate-200 bg-white hover:bg-slate-50">並び替え</button>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <KeyholeIcon className="w-5 h-5 text-cyan-600"/>
              <div className="text-sm text-slate-700">TOBARIは <strong>鍵を渡さず権限だけを通す</strong> 共有です。アカウントでもリンクでもない、第三の共有。</div>
            </div>
          </div>

          <div className="mt-4">
            {view === "grid" ? (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {filtered.map(item => (
                  <Card key={item.id} item={item} onShare={(it)=>{setSelected(it); setShareOpen(true);}}/>
                ))}
              </div>
            ) : (
              <table className="w-full text-sm bg-white border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-500">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-medium">名前</th>
                    <th className="px-4 py-2 font-medium">ラベル</th>
                    <th className="px-4 py-2 font-medium">更新日</th>
                    <th className="px-4 py-2 font-medium">サイズ</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(item => (
                    <tr key={item.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <TypeIcon type={item.type} ext={item.ext}/>
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="px-4 py-3"><Badge label={item.label}/></td>
                      <td className="px-4 py-3 text-slate-600">{item.updated}</td>
                      <td className="px-4 py-3 text-slate-600">{item.size || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={()=>{setSelected(item); setShareOpen(true);}} className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">共有</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {shareOpen && selected && (
        <ShareModal item={selected} onClose={()=>setShareOpen(false)} />
      )}
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Item {
  id: string;
  type: "folder" | "file";
  name: string;
  ext?: string;
  size?: string;
  updated: string;
  members?: number;
  label?: string;
  color?: "indigo" | "teal" | "cyan";
}

// アクセス条件のプリセット定義
interface Preset {
  id: string;
  icon: string;
  label: string;
  desc: string;
  placeholder: string;
  tags: string[];
}

const PRESETS: Preset[] = [
  {
    id: "purchase",
    icon: "🛒",
    label: "購入者限定",
    desc: "この商品・サービスを購入した人のみ",
    placeholder: "例：「TOBARI入門セミナーを購入した人」",
    tags: ["購入証明あり"],
  },
  {
    id: "subscription",
    icon: "💳",
    label: "メンバー限定",
    desc: "有効なメンバーシップを持つ人のみ（失効すると自動でアクセス不可）",
    placeholder: "例：「プレミアムプランの会員」",
    tags: ["有効期間中のみ", "解約後即失効"],
  },
  {
    id: "event",
    icon: "🎪",
    label: "イベント参加者限定",
    desc: "特定のイベントに参加した人のみ",
    placeholder: "例：「2026 Web3カンファレンス参加者」",
    tags: ["参加証明あり"],
  },
  {
    id: "completion",
    icon: "🎓",
    label: "修了者限定",
    desc: "指定したコースや試験を修了・合格した人のみ",
    placeholder: "例：「基礎コースを修了した人」",
    tags: ["修了証あり"],
  },
  {
    id: "community",
    icon: "🏘️",
    label: "コミュニティメンバー限定",
    desc: "特定のコミュニティ・グループに所属する人のみ",
    placeholder: "例：「〇〇プロジェクトのメンバー」",
    tags: ["メンバーシップ確認"],
  },
  {
    id: "timed",
    icon: "⏰",
    label: "期間限定公開",
    desc: "指定した期間中のみアクセス可能。期限後は自動で閉まる",
    placeholder: "例：「2026年3月末まで」",
    tags: ["期限自動失効"],
  },
];

// ─── ShareModal ───────────────────────────────────────────────────────────────

function ShareModal({item, onClose}:{item:Item; onClose:()=>void}){
  const [tab, setTab] = useState<"invite"|"policy">("invite");
  const [emails, setEmails] = useState("alice@example.com, bob@company.com");
  const [expiry, setExpiry] = useState("2026-03-31");
  const [views, setViews] = useState(100);
  const [watermark, setWatermark] = useState(true);

  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[760px] max-w-[94vw] rounded-2xl border border-slate-200 bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <TypeIcon type={item.type} ext={item.ext}/>
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-xs text-slate-500">共有設定</div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50">閉じる</button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4">
          <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden text-sm">
            <button onClick={()=>setTab("invite")} className={`px-4 py-2 ${tab==='invite'?'bg-slate-900 text-white':'bg-white hover:bg-slate-50'}`}>
              招待
            </button>
            <button onClick={()=>setTab("policy")} className={`px-4 py-2 ${tab==='policy'?'bg-slate-900 text-white':'bg-white hover:bg-slate-50'}`}>
              アクセス条件 ✨
            </button>
          </div>
        </div>

        {/* Invite Tab (unchanged) */}
        {tab==='invite' ? (
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500">メール/ユーザー（閲覧・編集 権限）</label>
                <textarea value={emails} onChange={e=>setEmails(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3}/>
                <div className="mt-2 flex items-center gap-2">
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">閲覧</button>
                  <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">編集</button>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500">期限・制限</label>
                <div className="mt-1 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-slate-600 text-xs mb-1">有効期限</div>
                    <input value={expiry} onChange={e=>setExpiry(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2"/>
                  </div>
                  <div>
                    <div className="text-slate-600 text-xs mb-1">最大表示回数</div>
                    <input type="number" value={views} onChange={e=>setViews(parseInt(e.target.value||'0'))} className="w-full rounded-lg border border-slate-300 px-3 py-2"/>
                  </div>
                  <label className="col-span-2 inline-flex items-center gap-2 text-slate-700 mt-1">
                    <input type="checkbox" checked={watermark} onChange={e=>setWatermark(e.target.checked)} />
                    透かし（閲覧者ID）
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">形式：<strong>鍵は共有せず</strong>、権限トークンのみ発行</div>
              <button className="rounded-xl bg-gradient-to-r from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9] text-white px-4 py-2 text-sm">招待を送信</button>
            </div>
          </div>
        ) : (
          /* ── アクセス条件タブ（新設計） ── */
          <PolicyTab item={item} />
        )}

        <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="text-xs text-slate-500">すべてのアクセスは記録・追跡されます（改竄防止）。</div>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-white hover:bg-slate-50">監査ログを表示</button>
        </div>
      </div>
    </div>
  );
}

// ─── PolicyTab ────────────────────────────────────────────────────────────────

function PolicyTab({item}:{item:Item}){
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [nlInput, setNlInput] = useState("");
  const [parsed, setParsed] = useState<ParsedCondition | null>(null);
  const [parsing, setParsing] = useState(false);
  const [additionalExpiry, setAdditionalExpiry] = useState("");
  const [showLink, setShowLink] = useState(false);

  const preset = PRESETS.find(p => p.id === selectedPreset);

  function handleParse() {
    if (!nlInput.trim()) return;
    setParsing(true);
    // デモ用：入力テキストを解析したふりをして条件タグを生成
    setTimeout(() => {
      setParsed(mockParse(nlInput, selectedPreset));
      setParsing(false);
    }, 900);
  }

  return (
    <div className="p-5 space-y-5">

      {/* Step 1: プリセット選択 */}
      <div>
        <div className="text-sm font-semibold text-slate-700 mb-2">① どんな人にアクセスを許可しますか？</div>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedPreset(p.id); setNlInput(""); setParsed(null); }}
              className={`text-left rounded-xl border px-3 py-2.5 text-sm transition ${
                selectedPreset === p.id
                  ? "border-cyan-400 bg-cyan-50 shadow-sm"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div className="text-base mb-0.5">{p.icon}</div>
              <div className="font-medium text-slate-800">{p.label}</div>
              <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: 自然言語入力 */}
      {selectedPreset && (
        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">② 条件を言葉で教えてください</div>
          <div className="relative">
            <textarea
              value={nlInput}
              onChange={e => { setNlInput(e.target.value); setParsed(null); }}
              placeholder={preset?.placeholder}
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={handleParse}
              disabled={!nlInput.trim() || parsing}
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm disabled:opacity-40"
            >
              {parsing ? "解析中…" : "条件を確認する →"}
            </button>
            {parsed && <span className="text-xs text-slate-400">✓ 解析完了</span>}
          </div>
        </div>
      )}

      {/* Step 3: 解析結果プレビュー */}
      {parsed && (
        <div>
          <div className="text-sm font-semibold text-slate-700 mb-2">③ このような条件で設定します</div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {parsed.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9] text-white px-3 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-700">{parsed.summary}</p>

            {/* 追加：期限設定 */}
            <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
              <label className="text-xs text-slate-500 shrink-0">期限を追加（任意）</label>
              <input
                type="date"
                value={additionalExpiry}
                onChange={e => setAdditionalExpiry(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
              />
              {additionalExpiry && (
                <span className="text-xs text-slate-500">{additionalExpiry} 以降は自動でアクセス不可</span>
              )}
            </div>

            {/* アクセス拒否メッセージプレビュー */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
              <strong>アクセス条件を満たしていない人には：</strong><br/>
              「{parsed.gateMessage}」と表示されます
              {parsed.ctaLabel && <span className="ml-1">→ [{parsed.ctaLabel}]ボタンを表示</span>}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setShowLink(true)}
              className="rounded-xl bg-gradient-to-r from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9] text-white px-5 py-2 text-sm shadow-sm"
            >
              条件付き共有リンクを生成
            </button>
            <button className="text-xs text-slate-400 underline">条件をリセット</button>
          </div>
        </div>
      )}

      {/* 生成リンク */}
      {showLink && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs">
          <div className="text-slate-500 mb-1">共有リンク（条件付き）</div>
          <code className="text-slate-700 break-all">
            https://tobari.app/open/RES-{item.id}?gate={selectedPreset}&exp={additionalExpiry || "none"}
          </code>
          <div className="mt-2 text-slate-400">このリンクを受け取った人は、条件を満たしている場合のみアクセスできます。条件が変わると自動で反映されます。</div>
        </div>
      )}
    </div>
  );
}

// ─── モック解析ロジック ────────────────────────────────────────────────────────

interface ParsedCondition {
  tags: string[];
  summary: string;
  gateMessage: string;
  ctaLabel?: string;
}

function mockParse(input: string, presetId: string | null): ParsedCondition {
  switch(presetId) {
    case "purchase":
      return {
        tags: ["購入者限定", "購入証明を自動確認"],
        summary: `「${input}」の購入者のみアクセス可能。購入後すぐに有効になり、返金された場合は自動で失効します。`,
        gateMessage: `このファイルは「${input}」をお持ちの方のみ閲覧できます`,
        ctaLabel: "購入ページを見る",
      };
    case "subscription":
      return {
        tags: ["メンバー限定", "解約後即失効", "自動更新確認"],
        summary: `有効なメンバーシップを持つ人のみ。解約した瞬間アクセスが自動で閉まります。`,
        gateMessage: "このファイルはメンバー限定です。有効なプランをお持ちの方のみ閲覧できます",
        ctaLabel: "プランに加入する",
      };
    case "event":
      return {
        tags: ["参加者限定", "参加証明を確認"],
        summary: `「${input}」の参加者のみアクセス可能。参加記録をもとに自動判定します。`,
        gateMessage: `このファイルは「${input}」参加者のみ閲覧できます`,
        ctaLabel: "イベントの詳細",
      };
    case "completion":
      return {
        tags: ["修了者限定", "修了証を自動確認"],
        summary: `「${input}」を修了した人のみ。修了記録に基づいて自動でアクセスが開きます。`,
        gateMessage: "このファイルは前のステップを完了した方のみ閲覧できます",
        ctaLabel: "コースを始める",
      };
    case "community":
      return {
        tags: ["コミュニティ限定", "メンバーシップ確認"],
        summary: `「${input}」のメンバーのみアクセス可能。コミュニティを離れると自動で失効します。`,
        gateMessage: "このファイルはコミュニティメンバー限定です",
        ctaLabel: "コミュニティに参加する",
      };
    case "timed":
      return {
        tags: ["期間限定", "期限後自動失効"],
        summary: `期間終了後はリンクが自動で無効になります。削除や変更の手間なし。`,
        gateMessage: "この共有は公開期間が終了しました",
      };
    default:
      return {
        tags: ["条件付きアクセス"],
        summary: input,
        gateMessage: "アクセス条件を満たしていません",
      };
  }
}

// ─── Components ───────────────────────────────────────────────────────────────

function SideLink({label, icon, active=false}:{label:string; icon:JSX.Element; active?:boolean}){
  return (
    <button className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm border ${active? 'bg-slate-900 text-white border-slate-900':'bg-white border-slate-200 hover:bg-slate-50'}`}>
      <span className="shrink-0">{icon}</span>
      <span className="truncate text-left">{label}</span>
    </button>
  );
}

function Breadcrumb({segments}:{segments:string[]}){
  return (
    <div className="text-sm text-slate-600 flex items-center gap-2">
      {segments.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          {i>0 && <span className="text-slate-400">/</span>}
          <span className={i===segments.length-1? 'font-semibold text-slate-900':'hover:underline cursor-pointer'}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function Badge({label}:{label?:string}){
  if(!label) return null;
  const map:any = {
    "扉共有": "from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9]",
    "E2EE": "from-[#1E293B] via-[#334155] to-[#64748B]",
    "条件付き": "from-[#0F766E] via-[#0E7490] to-[#0369A1]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${map[label]||'from-slate-200 to-slate-300'} text-white px-2 py-0.5 text-[11px]`}>{label}</span>
  );
}

function Card({item, onShare}:{item:Item; onShare:(i:Item)=>void}){
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type==='folder'?'bg-slate-100':'bg-slate-50 border border-slate-200'}`}>
            <TypeIcon type={item.type} ext={item.ext}/>
          </div>
          <div>
            <div className="font-medium leading-tight truncate max-w-[18ch]" title={item.name}>{item.name}</div>
            <div className="text-xs text-slate-500">最終更新 {item.updated}</div>
          </div>
        </div>
        <Badge label={item.label}/>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-500">{item.type==='folder'? `${item.members||0} メンバー`: (item.size || '')}</div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <button className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs hover:bg-slate-50">ダウンロード</button>
          <button onClick={()=>onShare(item)} className="rounded-lg bg-slate-900 text-white px-2.5 py-1.5 text-xs">共有</button>
        </div>
      </div>
    </div>
  );
}

function TypeIcon({type, ext}:{type:Item["type"]; ext?:string}){
  if(type==='folder') return <FolderIcon className="w-5 h-5 text-slate-600"/>;
  return <FileIcon ext={ext} className="w-5 h-5 text-slate-600"/>;
}

function LogoMark({className="w-6 h-6"}:{className?:string}){
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <linearGradient id="veil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B5BDB"/>
          <stop offset="50%" stopColor="#15AABF"/>
          <stop offset="100%" stopColor="#0EA5E9"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#0F172A" strokeWidth="10" />
      <rect x="30" y="32" width="60" height="10" rx="5" fill="url(#veil)" />
      <rect x="32" y="42" width="22" height="50" rx="6" fill="url(#veil)" />
      <rect x="49" y="42" width="22" height="50" rx="6" fill="url(#veil)" opacity="0.9" />
      <rect x="66" y="42" width="22" height="50" rx="6" fill="url(#veil)" opacity="0.8" />
      <rect x="60" y="42" width="3" height="50" fill="#0F172A" opacity="0.25" />
    </svg>
  );
}

function SearchIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="1.5"/><path d="M20 20l-3.5-3.5" strokeWidth="1.5"/></svg>)}
function DriveIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><path d="M4 7h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" strokeWidth="1.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="1.5"/></svg>)}
function ShareIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" strokeWidth="1.5"/><path d="M12 16V3m0 0 4 4M12 3 8 7" strokeWidth="1.5"/></svg>)}
function KeyholeIcon({className="w-5 h-5 text-slate-700"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="1.5"/><path d="M8 22v-3a4 4 0 1 1 8 0v3" strokeWidth="1.5"/></svg>)}
function ClockIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="1.5"/><path d="M12 7v6l4 2" strokeWidth="1.5"/></svg>)}
function ArchiveIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="4" rx="1" strokeWidth="1.5"/><rect x="5" y="8" width="14" height="12" rx="1" strokeWidth="1.5"/></svg>)}
function TrashIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><path d="M4 7h16" strokeWidth="1.5"/><path d="M10 3h4a1 1 0 0 1 1 1v2H9V4a1 1 0 0 1 1-1Z" strokeWidth="1.5"/><rect x="6" y="7" width="12" height="13" rx="1" strokeWidth="1.5"/></svg>)}
function TeamIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3" strokeWidth="1.5"/><circle cx="17" cy="9" r="2" strokeWidth="1.5"/><path d="M4 19a5 5 0 0 1 10 0" strokeWidth="1.5"/><path d="M14 19a4 4 0 0 1 7 0" strokeWidth="1.5"/></svg>)}
function FolderIcon({className="w-5 h-5"}:{className?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" strokeWidth="1.5"/></svg>)}
function FileIcon({className="w-5 h-5", ext}:{className?:string; ext?:string}){return(<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"><path d="M7 3h6l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeWidth="1.5"/><path d="M13 3v6h6" strokeWidth="1.5"/></svg>)}
function Avatar(){return(<div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B5BDB] via-[#15AABF] to-[#0EA5E9]" title="あなた"/>)}
