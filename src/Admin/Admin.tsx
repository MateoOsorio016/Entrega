import { Outlet, useNavigate } from 'react-router-dom';
import { AdminMenu } from '../components/AdminMenu/AdminMenu';
import userImage from '../assets/userImage.jpg';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer, Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';

import './Admin.css';

export const Admin = () => {
	return (
		<div className='Admin'>
			<AdminMenu />
			<PerfilUsuario />

			<div className='appContent'>
				<Outlet />
			</div>
		</div>
	);
};

const PerfilUsuario = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	return (
		<div>
			<button
				style={{
					width: '100px',
					height: '100px',
					borderRadius: '50%',
					border: 'none',
					backgroundColor: 'transparent',
					cursor: 'pointer',
					position: 'absolute',
					top: '10px',
					right: '10px',
				}}
				onClick={() => setIsModalOpen(true)}
			>
				<img
					src={userImage}
					alt=''
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '50%',
						objectFit: 'cover',
					}}
				/>
			</button>
			{isModalOpen &&
				createPortal(
					<ModalContainer ShowModal={setIsModalOpen}>
						<Modal showModal={setIsModalOpen}>
							<div style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								height: '100%',
								padding: '2rem 1rem',
								flexDirection: 'column',
							}}>
								<div
									style={{
										width: '250px',
										height: '250px',
										borderRadius: '50%',
										border: 'none',
										backgroundColor: 'transparent',
									}}
								>
									<img
										src={userImage}
										alt=''
										style={{
											width: '100%',
											height: '100%',
											borderRadius: '50%',
											objectFit: 'cover',
										}}
									/>
								</div>
								<div style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
									height: '100%',
									padding: '2rem 1rem',
								}}>
									<h2 style={{
										fontSize: '1.5rem',
										fontWeight: 'bold',
										margin: '1rem 0',
									}}>
										Sara Herrera
									</h2>
									<p style={{
										fontSize: '1rem',
										fontWeight: 'bold',
										margin: '1rem 0',
									}}>
										sara.herrera@example.com
									</p>
									<p style={{
										fontSize: '1rem',
										fontWeight: 'bold',
										margin: '1rem 0',
									}}>
										+57 300 123 4567
									</p>
								</div>
								<Button onClick={() => navigate('/')} text={'Cerrar Sesión'} />
							</div>
						</Modal>
					</ModalContainer>,
					document.querySelector('#modal') as HTMLDivElement
				)}
		</div>
	);
};
