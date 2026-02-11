
export interface Group {
    group_id: number;
    group_name: string;
}

export interface Meeting {
    meeting_id: number;     
    group_id: number;  
    group_name: string;    
    meeting_title: string;  
    description: string;
    start_time: string;   
    end_time: string;
    room_name: string;
}