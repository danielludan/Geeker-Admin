// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    // access_token: string;
    // Djangorest jwt默认返回的字段为access
    access: string;
    refresh: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }

  export interface BaseUser {
    id: string;
    username: string;
    password: string;
    is_active: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    first_name: string;
    last_name: string;
    email: string;
    last_login: Date;
  }

  export interface UserProfile {
    avatar: string;
    address: string;
    gender: number | null;
    phone: string;
    userAreaGroupId: number | null;
  }
  export interface ResUserList extends BaseUser {
    profile: UserProfile;
  }

  export interface ResUserDetail extends BaseUser {
    profile: UserProfile;
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}
