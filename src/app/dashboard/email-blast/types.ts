export type ContactWithEngagement = {
  id: string;
  email: string;
  name: string | null;
  tags: string | null;
  totalSent: number;
  totalBounced: number;
  totalCampaigns: number;
  totalOpened: number;
  totalClicked: number;
  avgOpenCount: number;
  avgOpenHour: number | null;
  favoriteDayOfWeek: number | null;
  lastOpenedAt: Date | null;
  lastSentAt: Date | null;
  clickedNotOpened: boolean;
};
