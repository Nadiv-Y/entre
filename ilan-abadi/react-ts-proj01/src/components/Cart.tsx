import type { CartProps } from './types'
export default function Cart(props:CartProps) {

  return (
    <div>
      <h2>My Cart</h2>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>{
            props.data.length === 0 ? (
                <tr>
                    <td className="warning-text" colSpan={5}>Your Cart is empty!</td>
                </tr>
            ):(
                props.data.map(obj => (
                    <tr key={obj.id}>
                        <td>{obj.name}</td>
                        <td>{obj.category}</td>
                        <td>{obj.price}</td>
                        <td><img src={obj.image} alt={obj.name+' picture'} width='50px'></img></td>
                        <td><button onClick={()=>props.remove(obj.id)}>Remove Product</button></td>
                    </tr>
                ))
            )
            }
        </tbody>
      </table>
    </div>
  )
}
