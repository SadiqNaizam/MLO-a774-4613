import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelAnalytics from '../components/Dashboard/FunnelAnalytics';
import SourcesChart from '../components/Dashboard/SourcesChart';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import LossReasonsList from '../components/Dashboard/LossReasonsList';
import OtherStats from '../components/Dashboard/OtherStats';

/**
 * LeadsDashboardPage is the main page for displaying leads overview.
 * It assembles various dashboard components (charts, stats cards) within the MainAppLayout.
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout title="Leads Dashboard">
      {/* 
        This container div implements the layout specified in Project Requirements > Layout Requirements > mainContent.container:
        "gap-6 grid grid-cols-2"
        Individual components are responsible for their content and internal layout.
        LeadsTrackingChart includes `col-span-2` in its own styling, so it will span both columns of this grid.
      */}
      <div className="grid grid-cols-2 gap-6">
        {/* Row 1: Funnel Analytics and Sources Chart */}
        <FunnelAnalytics />
        <SourcesChart />

        {/* Row 2: Leads Tracking Chart (spans both columns) */}
        {/* The LeadsTrackingChart component is already styled with `col-span-2` */}
        <LeadsTrackingChart />

        {/* Row 3: Loss Reasons List and Other Stats */}
        <LossReasonsList />
        <OtherStats />
      </div>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
