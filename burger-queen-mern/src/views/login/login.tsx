import logoBQ from './logoBQ.png';
import styles from './login.module.scss';

export const Login = () => {
  return (
    <div className={styles['login']}>
      <div className={styles['login-logo']}>
        <img className={styles['logo']} src={logoBQ} alt=''></img>
      </div>
      <div className={styles['login-form']}>
        <h1>Iniciar Sesión</h1>
        <form>
          <input
            className={styles['user']}
            type='text'
            placeholder='Usuario'
            name='username'
          ></input>
          <br />
          <input
            className={styles['password']}
            type='password'
            placeholder='Contraseña'
            name='password'
          ></input>
          <br />
          <button>Ingresar</button>
        </form>
      </div>
    </div>
  );
};
