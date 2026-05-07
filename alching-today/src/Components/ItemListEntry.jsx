import './ItemListEntry.css'

export default function ItemListEntry({ name, icon, alch_value, GE_value, trade_limit }) {
  return (
    <div className="item_entry">
      <img src={icon} alt={`${name}`} />
      <div className="item_details">
        <div className="name">{name}</div>
        <div className="alch_value">High Alch: {alch_value}</div>
        <div className="GE_value">GE avg price: {GE_value}</div>
        <div className="trade_limit">Trade limit: {trade_limit}</div>
      </div>
    </div>
  );

}

export { ItemListEntry }