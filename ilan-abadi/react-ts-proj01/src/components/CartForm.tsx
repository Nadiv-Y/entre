import React, { ChangeEvent, FormEvent, useState } from 'react'
import Cart from './Cart'
import type { InputsObj, Product } from './types'
export default function CartForm() {
    const [inputs, setInputs] = useState<InputsObj>({
        'name': '',
        'category': '',
        'price': '',
        'image': ''
    })

    const setInputsObj = (changeInput: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const name = changeInput.target.name
        const value = changeInput.target.value
        setInputs(prevInput => ({...prevInput, [name]: value}))
    }

    const [cartData, setCartData] = useState<Product[]>([])

    const addToCart = (clickAddtoCart: FormEvent) => {
        clickAddtoCart.preventDefault()

        if(!inputs.name || !inputs.category || !inputs.price || !inputs.image){
            return alert('All fields must be filled')
        }

        const inputsObjWithId = {...inputs, 'id': Date.now()}
        setCartData(prevObj => ([...prevObj, inputsObjWithId]))
        setInputs({
            'name': '',
            'category': '',
            'price': '',
            'image': ''
        })
    }
    const removeProduct = (productId: number) => {
        setCartData(prevData => prevData.filter(obj => obj.id !== productId))
    }
  return (
    <div>
      <form>
        <div>
            <label>Product's Name:
                <input name='name' value={inputs.name} onChange={setInputsObj}></input>
            </label>
        </div>
        <div>
            <label>Category:
                <select name='category' value={inputs.category} onChange={setInputsObj}>
                    <option value={''}></option>
                    <option value={'drinks'}>Drinks</option>
                    <option value={'meat'}>Meat</option>
                    <option value={'dairy'}>Dairy</option>
                    <option value={'snacks'}>Snacks</option>
                    <option value={'basic'}>Basic</option>
                </select>
            </label>
        </div>
        <div>
            <label>Price:
                <input name='price' value={inputs.price} onChange={setInputsObj}></input>
            </label>
        </div>
        <div>
            <label>Product's Image Link:
                <input name='image' value={inputs.image} onChange={setInputsObj}></input>
            </label>
        </div>
        <div><button onClick={addToCart}>Add Product</button></div>
      </form>
      <Cart data = {cartData} remove = {removeProduct}/>
    </div>
  )
}
