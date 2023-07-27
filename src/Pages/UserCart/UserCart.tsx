import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserCart.css';

import ProductImage from '../../assets/product.jpg';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import Swal from 'sweetalert2';

export const UserCart = () => {
	function handleClick() {
		Swal.fire({
			title: 'El producto se ha eliminado del carrito',
      text: 'El producto se ha eliminado del carrito',
      icon: 'success',
		});
	}

	function menorZero() {
		Swal.fire({
			title: 'Hubo un error al querer realizar la acción',
			text: 'No puedes vaciar un producto menos a 1',
			icon: 'error',
		});
	}

	const [cantidadOne, setCantidadOne] = useState(1);
	const [cantidadTwo, setCantidadTwo] = useState(1);
	const [cantidadThree, setCantidadThree] = useState(1);
	const [cantidadFour, setCantidadFour] = useState(1);
	const [cantidadFive, setCantidadFive] = useState(1);

  const navigate = useNavigate();


	return (
		<>
			<div className='userCart__header'>
				<span className='userCart__activeItem'>Cart</span>
				<span>Complete Your Information</span>
				<span>Shipping</span>
				<span>Pay</span>
			</div>
			<div className='userCart__body'>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Unit. Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div className='userCart__product'>
									<img src={ProductImage} alt='' />
									<div className='userCart__productInfo'>
										<h4>Burdeo Coffee</h4>
										<p>Premium coffee with intense notes of cocoa and nuts.</p>
									</div>
								</div>
							</td>
							<td>
								<div className='userCart__quantity'>
									<button
										onClick={() =>
											cantidadOne > 1
												? setCantidadOne((previous) => previous - 1)
												: menorZero()
										}
									>
										-
									</button>
									<span>{cantidadOne}</span>
									<button
										onClick={() => setCantidadOne((previous) => previous + 1)}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<span>$ 50.000</span>
							</td>
							<td>
								<button onClick={handleClick}>
									<FaTrash />
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<div className='userCart__product'>
									<img src={ProductImage} alt='' />
									<div className='userCart__productInfo'>
										<h4>Burdeo Coffee</h4>
										<p>Premium coffee with intense notes of cocoa and nuts.</p>
									</div>
								</div>
							</td>
							<td>
								<div className='userCart__quantity'>
									<button
										onClick={() =>
											cantidadTwo > 1
												? setCantidadTwo((previous) => previous - 1)
												: menorZero()
										}
									>
										-
									</button>
									<span>{cantidadTwo}</span>
									<button
										onClick={() => setCantidadTwo((previous) => previous + 1)}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<span>$ 50.000</span>
							</td>
							<td>
								<button onClick={handleClick}>
									<FaTrash />
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<div className='userCart__product'>
									<img src={ProductImage} alt='' />
									<div className='userCart__productInfo'>
										<h4>Burdeo Coffee</h4>
										<p>Premium coffee with intense notes of cocoa and nuts.</p>
									</div>
								</div>
							</td>
							<td>
								<div className='userCart__quantity'>
									<button
										onClick={() =>
											cantidadThree > 1
												? setCantidadThree((previous) => previous - 1)
												: menorZero()
										}
									>
										-
									</button>
									<span>{cantidadThree}</span>
									<button
										onClick={() => setCantidadThree((previous) => previous + 1)}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<span>$ 50.000</span>
							</td>
							<td>
								<button onClick={handleClick}>
									<FaTrash />
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<div className='userCart__product'>
									<img src={ProductImage} alt='' />
									<div className='userCart__productInfo'>
										<h4>Burdeo Coffee</h4>
										<p>Premium coffee with intense notes of cocoa and nuts.</p>
									</div>
								</div>
							</td>
							<td>
								<div className='userCart__quantity'>
									<button
										onClick={() =>
											cantidadFour > 1
												? setCantidadFour((previous) => previous - 1)
												: menorZero()
										}
									>
										-
									</button>
									<span>{cantidadFour}</span>
									<button
										onClick={() => setCantidadFour((previous) => previous + 1)}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<span>$ 50.000</span>
							</td>
							<td>
								<button onClick={handleClick}>
									<FaTrash />
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<div className='userCart__product'>
									<img src={ProductImage} alt='' />
									<div className='userCart__productInfo'>
										<h4>Burdeo Coffee</h4>
										<p>Premium coffee with intense notes of cocoa and nuts.</p>
									</div>
								</div>
							</td>
							<td>
								<div className='userCart__quantity'>
									<button
										onClick={() =>
											cantidadFive > 1
												? setCantidadFive((previous) => previous - 1)
												: menorZero()
										}
									>
										-
									</button>
									<span>{cantidadFive}</span>
									<button
										onClick={() => setCantidadFive((previous) => previous + 1)}
									>
										+
									</button>
								</div>
							</td>
							<td>
								<span>$ 50.000</span>
							</td>
							<td>
								<button onClick={handleClick}>
									<FaTrash />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div className='userCart__total'>
					<Form
						fields={[
							{ name: 'discount', label: 'Disccount Code', type: 'text' },
						]}
						button={
							<Button
								onClick={() => null}
								text={'Apply disccount'}
								fill={false}
							/>
						}
						onSubmit={e=> {
              e.preventDefault()
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El código ingresado no es válido',
              })
            }}
						cancelButton={false}
					/>
					<div className='userCart__totalInfo'>
						<div className='userCart__payInfo'>
							<span>Subtotal</span>
							<span>$ 150.000</span>
						</div>
						<div className='userCart__payInfo'>
							<span>Impuestos</span>
							<span>$ 28.500</span>
						</div>
						<div className='userCart__payInfo'>
							<span>Envío</span>
							<span>$ 10.000</span>
						</div>
						<div className='userCart__totalInfoCart'>
							<span>Total</span>
							<span>$ 188.500</span>
						</div>
					</div>
					<div className='userCart__buttons'>
						<Button text={'Finish Order'} fill={false} onClick={() => null} />
						<Button
							text={'Continue Shopping'}
							fill={true}
							onClick={() => navigate('/')}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
