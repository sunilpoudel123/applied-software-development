import React, { FC } from 'react';
import { DashboardWrapper } from './dashboard.styled';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => (
    <DashboardWrapper>
        Dashboard Component
    </DashboardWrapper>
);

export default Dashboard;
