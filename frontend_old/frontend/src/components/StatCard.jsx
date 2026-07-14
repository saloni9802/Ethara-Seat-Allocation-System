export default function StatCard({title,value}) {

  return (

    <div style={{
      border:"1px solid #ddd",
      borderRadius:"10px",
      padding:"20px",
      width:"220px",
      background:"#f8fafc"
    }}>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>

  );

}