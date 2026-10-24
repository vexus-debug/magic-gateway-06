import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrg } from "@/hooks/useOrg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

export const PRICE_PER_CASE = 500; // ₦ per case

const db = supabase as any;

function useWallet(orgId?: string) {
  return useQuery({
    queryKey: ["case-wallet", orgId],
    enabled: !!orgId,
    queryFn: async () => {
      const { data } = await db.from("clinic_wallets").select("balance").eq("org_id", orgId).maybeSingle();
      return (data?.balance as number) ?? 0;
    },
    refetchInterval: 60_000,
  });
}

/** Header badge for dental clinics: remaining case credits. */
export function CaseWalletBadge() {
  const { currentOrg } = useOrg();
  const billingOrg = currentOrg?.parent_org_id || currentOrg?.org_id;
  const isDental = currentOrg?.clinic_type === "dental";
  const { data: balance = 0 } = useWallet(isDental ? billingOrg : undefined);
  if (!isDental) return null;
  const low = balance < 5;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={low ? "destructive" : "outline"} size="sm" className="h-8 gap-1.5 px-2.5">
          <Wallet className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">{balance}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-2 text-sm">
        <p className="font-semibold">Case credits: {balance}</p>
        <p className="text-muted-foreground">
          Each new patient case costs ₦{PRICE_PER_CASE.toLocaleString()} and covers that patient for 30 days.
        </p>
        {balance === 0 ? (
          <p className="font-medium text-destructive">No credits left — new visits are blocked until you top up.</p>
        ) : low ? (
          <p className="font-medium text-destructive">Running low — top up soon.</p>
        ) : null}
        <p className="text-muted-foreground">To top up, contact Clinexus support to buy more credits.</p>
      </PopoverContent>
    </Popover>
  );
}

/** Super-admin card to add case credits to a clinic. */
export function AdminWalletTopup({ orgId }: { orgId: string }) {
  const qc = useQueryClient();
  const { data: balance = 0 } = useWallet(orgId);
  const [credits, setCredits] = useState("10");
  const [busy, setBusy] = useState(false);
  const n = parseInt(credits, 10) || 0;

  const topup = async () => {
    setBusy(true);
    const { error } = await db.rpc("admin_topup_wallet", { p_org_id: orgId, p_credits: n, p_note: `Top-up ₦${(n * PRICE_PER_CASE).toLocaleString()}` });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Added ${n} case credits`);
    qc.invalidateQueries({ queryKey: ["case-wallet", orgId] });
  };

  return (
    <Card className="glass-card">
      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Wallet className="h-4 w-4" /> Case credits</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">Balance: <span className="font-semibold">{balance}</span> cases</p>
        <div className="flex items-center gap-2">
          <Input type="number" min={1} value={credits} onChange={(e) => setCredits(e.target.value)} className="w-28" />
          <Button onClick={topup} disabled={busy || n <= 0}>Add credits</Button>
        </div>
        <p className="text-xs text-muted-foreground">= ₦{(n * PRICE_PER_CASE).toLocaleString()} at ₦{PRICE_PER_CASE} per case</p>
      </CardContent>
    </Card>
  );
}
