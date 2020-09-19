import React from 'react';
import { Colors } from 'components/ui/Colors';
import MemberCard from './MemberCard';

const EventMembers = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <MemberCard
                icon="pedestrian"
                color={Colors.$yellow}
                name="Пешеход"
                gender="Мужчина"
                descr="Раненый, находящийся на стационарном лечении"
            />
            <h3 className="h3">Infiniti (FX-серия), 2011</h3>
            {/* <MemberCard /> */}
        </div>
    );
};

export default EventMembers;
