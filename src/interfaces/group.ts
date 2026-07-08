export interface Group {
  group_id: string;
  name: string;
  eventName: string;
  members: number;
  tournament_id: string;
  admin_id: string;
  users_limit: number;
  description?: string;
  observations?: string;
  invite_code?: string;
  created_at?: string;
}

export interface CreateGroupRequest {
  name: string;
  tournament_id: string;
  description?: string;
  observations?: string;
  users_limit?: number;
  admin_id: string;
  invite_code?: string;
}

export interface CreateGroupResponse {
  group_id: string;
  name: string;
  tournament_id: string;
  description?: string;
  observations?: string;
  users_limit?: number;
  admin_id: string;
  invite_code?: string;
}