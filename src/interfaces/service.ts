export interface Service {
    servicename: String,
    sid: number,
    address: String,
    from: String,
    bw_unit: String,
    contracted_bw: number,
    channel_bw: number,
    flex_pack: number,
    dynamic_flex_enabled: boolean,
    scheduled_flex_enabled: boolean,
    monthly_cost: number,
    scheduled_start_date: Date,
    scheduled_end_date: Date,
    scheduled_recurrence: String,
    scheduled_bw: number
}