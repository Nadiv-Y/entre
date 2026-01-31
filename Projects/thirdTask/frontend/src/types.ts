export type Group = {
  id: number;
  name: string
}

export type Meeting = {
  id: number;
  production_group: number;
  starting_time: string;
  ending_time: string;
  description: string;
  meeting_room: string;
}

export type NewMeeting = {
  production_group: number;
  starting_time: string;
  ending_time: string;
  description: string;
  meeting_room: string;
}
