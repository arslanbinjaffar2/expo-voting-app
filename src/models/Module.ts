export interface Module {
    id?: number,
    name: string,
    alias: string,
    icon: string,
    show_on_dashboard: number,
    alert: number,
    section_type?: string,
}

export interface SettingModule {
  name: string;
  alias: string;
}