import './ItemListEntry.css'

export default function ItemListEntry({ name, icon, alch_value, GE_value, trade_limit, nature_rune_cost }) {
  return (
    <div className="item_entry">
      <img src={icon} alt={`${name}`} />
      <div className="item_details">
        <div className="name">{name}</div>
        <div className="alch_value">High Alch: {alch_value.toLocaleString()} (<span className="text-emerald-300">+{alch_value - GE_value - nature_rune_cost}</span>)</div>
        <div className="GE_value">GE avg price: {GE_value.toLocaleString()}</div>
        <div className="trade_limit">Trade limit: {trade_limit.toLocaleString()} (total profit: <span className="text-emerald-300">{((alch_value - GE_value - nature_rune_cost) * trade_limit).toLocaleString()}</span>)</div>
      </div>
    </div>
  );

}

export { ItemListEntry }