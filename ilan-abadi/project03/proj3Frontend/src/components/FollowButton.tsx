import { Button } from 'react-bootstrap'
import vacationService from '../services/VacationService'
import { useAppDispatch } from '../redux/store'
import { toggleFollow } from '../redux/vacationSlice'

interface FollowButtonProps {
    vacationId: number;
    isFollowing: boolean;
}

export default function FollowButton({ vacationId, isFollowing }: FollowButtonProps) {
    const dispatch = useAppDispatch();

    const onFollowClick = async () => {
        try {
            if (isFollowing) {
                await vacationService.unfollowVacation(vacationId);
                dispatch(toggleFollow({ id: vacationId, isFollowing: false }));
            } else {
                await vacationService.followVacation(vacationId);
                dispatch(toggleFollow({ id: vacationId, isFollowing: true }));
            }
        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className='d-grid'>
            <Button
                variant={isFollowing ? 'primary block' : 'outline-primary block'}
                onClick={onFollowClick}>
                {isFollowing ? '✓ FOLLOWING' : 'Click to follow'}
            </Button>
        </div>
    )
}
