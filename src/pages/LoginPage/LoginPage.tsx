import type { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import inputIcons from '../../assets/icons/Input-Icons.svg';
import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSignIn = (role: 'pemohon' | 'admin') => {
    login(role);
    navigate(role === 'admin' ? '/admin/dashboard' : '/pemohon/dashboard');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRoleSignIn('pemohon');
  };

  return (
    <div className={styles.page}>
      <div className={styles.imagePanel}>
        <img
          src="/loginpageimage.png"
          alt="Office workspace"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.formPanel}>
        <img
          src="/logo-removebg-preview.png"
          alt="Electronic City"
          className={styles.logo}
        />
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Nice to see you again</h1>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login">
              Login
            </label>
            <div className={styles.inputWrap}>
              <input
                id="login"
                className={styles.input}
                type="text"
                placeholder="Email or phone number"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="Enter password"
              />
              <img
                src={inputIcons}
                alt=""
                aria-hidden="true"
                className={styles.inputIcon}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.remember}>
              <input type="checkbox" className={styles.toggleInput} />
              <span className={styles.toggle}></span>
              <span>Remember me</span>
            </label>
            <button type="button" className={styles.linkButton}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className={styles.signInButton}>
            Sign in
          </button>

          <div className={styles.divider}></div>

          <div className={styles.tempLogin}>
            <span className={styles.tempTitle}>Temporary login</span>
            <div className={styles.tempButtons}>
              <button
                type="button"
                className={styles.tempButton}
                onClick={() => handleRoleSignIn('pemohon')}
              >
                Pemohon
              </button>
              <button
                type="button"
                className={styles.tempButton}
                onClick={() => handleRoleSignIn('admin')}
              >
                Admin
              </button>
            </div>
          </div>

          <div className={styles.signupText}>
            <span>Dont have an account?</span>
            <button type="button" className={styles.linkButtonAlt}>
              Sign up now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
