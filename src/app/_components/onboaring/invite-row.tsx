import { Cancel01Icon } from "hugeicons-react";
import { UserIcon } from "lucide-react";
import { INVITE_ROLE_OPTIONS, type TeamInvite } from "./types";

const InviteRow = ({
  invite,
  onRemove,
}: {
  invite: TeamInvite;
  onRemove: () => void;
}) => {
  const roleLabel =
    INVITE_ROLE_OPTIONS.find((r) => r.value === invite.role)?.label ??
    invite.role;

  return (
    <div className="flex items-center gap-3 px-3 py-2 border border-border rounded-lg">
      <div className="flex justify-center items-center bg-primary/10 rounded-full w-7 h-7 shrink-0">
        <UserIcon className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-800 text-sm truncate">
          {invite.email}
        </p>
        <p className="text-muted-foreground text-xs">{roleLabel}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
        aria-label={`Remove ${invite.email}`}
      >
        <Cancel01Icon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InviteRow;
