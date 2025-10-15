import React, { FC } from 'react';
import { HomepageWrapper } from './homepage.styled';

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => (
    <HomepageWrapper>
        Homepage Component
    </HomepageWrapper>
);

export default Homepage;
