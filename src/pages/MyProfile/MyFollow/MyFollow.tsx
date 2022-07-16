import React, {FC} from 'react';

interface Props {
    item: string
    follow: boolean
}

const MyFollow: FC<Props> = ({item, follow}) => {
    console.log(item)
    return (
        <div>
            {follow ? 'My Followers' : 'My Following'}
        </div>
    );
};

export default MyFollow;