import re

file_path = r'c:\dev\web-weaver\workforge.team\src\app\_components\common\sidebar\app-sidebar.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sidebar variant="inset"
content = content.replace(
    '<Sidebar\n      collapsible="icon"\n      className="border-sidebar-border/60 border-r bg-white"\n    >',
    '<Sidebar\n      variant="inset"\n      collapsible="icon"\n      className="bg-[#f9f7f4] border-none"\n    >'
)

content = content.replace(
    'className="border-sidebar-border/40 border-b px-3 py-3"',
    'className="border-black/5 border-b px-3 py-3"'
)

content = content.replace(
    'className="border-sidebar-border/40 border-t px-3 py-3"',
    'className="border-black/5 border-t px-3 py-3"'
)

# PlanBadge
content = content.replace(
    'starter: { label: "Starter", className: "bg-zinc-100 text-zinc-500" },',
    'starter: { label: "Starter", className: "bg-slate-100 text-slate-600 ring-1 ring-black/5" },'
)
content = content.replace(
    'pro: { label: "Pro", className: "bg-blue-100 text-blue-600" },',
    'pro: { label: "Pro", className: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20" },'
)
content = content.replace(
    'className: "bg-amber-100 text-amber-600",',
    'className: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-600/20",'
)

# WorkspaceSwitcher
content = content.replace(
    'className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 transition-colors"',
    'className="group data-[state=open]:bg-white data-[state=open]:shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-black/5 hover:bg-black/5 transition-colors rounded-xl"'
)
content = content.replace(
    'rounded-xl bg-neutral-900 text-white shadow-sm"',
    'rounded-xl bg-[#f5f3f0] text-slate-700 ring-1 ring-black/10"'
)
content = content.replace(
    'text-sidebar-foreground truncate text-[13px]',
    'text-slate-900 truncate text-[13px]'
)
content = content.replace(
    'text-sidebar-foreground/50 text-[11px]',
    'text-slate-500 text-[11px]'
)
content = content.replace(
    'text-sidebar-foreground/40 ml-auto',
    'text-slate-400 ml-auto'
)
content = content.replace(
    'rounded-lg bg-neutral-900 text-white text-xs font-bold"',
    'rounded-lg bg-[#f5f3f0] text-slate-700 text-xs font-bold ring-1 ring-black/10"'
)

# Nav Items
content = content.replace(
    'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
    'bg-white shadow-sm ring-1 ring-black/5 font-medium text-slate-900'
)
content = content.replace(
    'hover:bg-sidebar-accent/60 text-sidebar-foreground/70 hover:text-sidebar-foreground',
    'hover:bg-black/5 text-slate-600 hover:text-slate-900'
)
content = content.replace(
    'isActive\n                    ? "text-sidebar-primary"\n                    : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70",',
    'isActive\n                    ? "text-slate-800"\n                    : "text-slate-400 group-hover:text-slate-600",'
)
content = content.replace(
    'isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"',
    'isActive ? "text-slate-800" : "text-slate-400"'
)
content = content.replace(
    'bg-blue-100 text-blue-600',
    'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20'
)
content = content.replace(
    'bg-sidebar-accent text-sidebar-foreground/60',
    'bg-slate-100 text-slate-500 ring-1 ring-black/5'
)
content = content.replace(
    'rounded-full bg-sidebar-primary"',
    'rounded-full bg-slate-800"'
)
content = content.replace(
    'text-sidebar-foreground/30 size-3.5',
    'text-slate-400 size-3.5'
)

# Footer
content = content.replace(
    'className="group hover:bg-sidebar-accent/60 data-[state=open]:bg-sidebar-accent h-12 rounded-xl transition-colors"',
    'className="group hover:bg-black/5 data-[state=open]:bg-white data-[state=open]:shadow-sm data-[state=open]:ring-1 data-[state=open]:ring-black/5 h-12 rounded-xl transition-colors"'
)
content = content.replace(
    'ring-sidebar-primary/20"',
    'ring-black/10"'
)

# Group Labels
content = content.replace(
    'text-sidebar-foreground/35',
    'text-slate-400'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

