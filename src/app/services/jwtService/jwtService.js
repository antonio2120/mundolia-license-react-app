import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {showMessage} from "../../store/fuse/messageSlice";
import {loginError} from "../../auth/store/loginSlice";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}
	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post(process.env.REACT_APP_API+'/register', data).then(response => {
				if (response.data.code == 200) {
					this.setSession(response.data.access_token);
					resolve(response.data);
				} else {
					reject(response.data.error);
				}
			});
		});
	};
	addContact = data => {
		return new Promise((resolve, reject) => {
			axios.post(process.env.REACT_APP_API+'/usuarios', data).then(response => {
				if (response.data.code == 200) {
					resolve(response.data);
				} else {
					reject(response.data.error);
				}
			});
		});
	};
	updateContact = data => {
		return  new Promise(function(resolve, reject) {
			try {
				axios.put(process.env.REACT_APP_API + '/usuarios/' + data.uuid, data).then(response => {
					if (response.data.code == 200) {
						resolve(response.data.user);
					} else {
						reject(response.data.error);
					}
				}).catch(error => {
					reject(error.response.data.error);
				});
			}catch (e){
				console.log(e);
			}
		});

	};
	updateContactGroup = data => {
		return new Promise((resolve, reject) => {
			try {
				axios.put(process.env.REACT_APP_API+'/usuariosgroup', data).then(response => {
					if (response.data.code == 200) {
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				}).catch(error => {
					reject(error.response.data.error);
				});
			}catch (e){
				console.log(e);
			}
		});
	};

	signInWithEmailAndPassword = (username, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(process.env.REACT_APP_API+'/login', {
						username,
						password
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						reject(response.data.error);
					}
				})
				.catch(error => {
					reject(error.response.data.error);
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.post(process.env.REACT_APP_API+'/access-token', {

					access_token: this.getAccessToken()

				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			axios
				.post(process.env.REACT_APP_API+'/logout')
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
