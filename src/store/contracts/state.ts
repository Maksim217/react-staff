export interface IEmployee {
  id: string;
  firstName: string;
  surName: string;
  middleName: string;
  position: string;
  DOB?: Date | null;
  gender?: string;
  fired?: boolean;
}

export interface IStaffState {
  staff: IEmployee[];
  employee?: IEmployee;
  operationType?: string;
}
