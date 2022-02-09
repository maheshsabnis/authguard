export class Orders {
  constructor(
    public OrderUniqueId: number,
    public OrderId: string,
    public ItemName: string,
    public CustomerName: string,
    public Quantity: number,
    public UnitPrice: number,
    public TotalPrice: number,
    public IsOrderApproved: boolean,
    public CreatedBy: string,
    public UpdatedBy: string
  ){}
}
