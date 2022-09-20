import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { RiKey2Line as KeyIcon } from 'react-icons/ri';
import GlowingButton from '../components/buttons/glowingButton/GlowingButton';
import Link from 'next/link';
import LoadingScreen from '../components/loadingScreen/LoadingScreen';
import styles from '../styles/Home.module.scss';
import { useLoginMutation } from '../redux/api/mambaApi';
import Head from 'next/head';


export const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarInner}>
                <h2 className={styles.navbarTitle}>
                    Mamba
                </h2>
                <div className={styles.navbarItems}>
                    {/* Link to /activity */}
                    <Link href="/activity">
                        <span className={styles.navbarLink}>
                            Activity
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const Home: NextPage = () => {
    const [login, { isLoading }] = useLoginMutation();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            const username = (values.username === '')? null : values.username;
            const password = (values.password === '')? null : values.password;

            login({ username, password })
            .unwrap()
            .then(response => {
                if (!response.valid) {
                    formik.setErrors({ username: 'Username or Password invalid' });
                } else {
                    router.push('/activity');
                }
            })
            .catch(() => {
                formik.setErrors({ username: 'Failed to connect to server' });
            });
        }
    });

    return (
        <div className={styles.context}>
            <Head>
                <title>Mamba</title>
            </Head>
            <LoadingScreen open={isLoading} />
            <Navbar />
            <div className={styles.container}>
                {/* Form + Header */}
                <div className={styles.formAndHeader}>
                    
                    {/* Header */}
                    <h2 className={styles.header}>
                        Welcome
                    </h2>

                    {/* Description */}
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                        tellus, luctus nec ullamcorper mattis.
                    </p>

                    {/* Form */}
                    <form className={styles.form} onSubmit={formik.handleSubmit} data-test="loginForm">

                        {/* Input Group */}
                        <div className={styles.inputGroup}>

                            {/* Username */}
                            <div className={styles.inputWrapper}>
                                <UserIcon />
                                <input
                                    autoComplete="new-password"
                                    placeholder="Username"
                                    className={styles.input}
                                    id="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    data-test="loginUsername"
                                />
                            </div>

                            {/* Password */}
                            <div className={styles.inputWrapper}>
                                <KeyIcon />
                                <input
                                    autoComplete="new-password"
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    data-test="loginPassword"
                                />
                            </div>

                        </div>
                        
                        {/* Additional buttons */}
                        <div className={styles.additionalButtons}>

                            {/* Password Recovery Link */}
                            <Link href="/passwordRecovery" data-test="loginRecoveryLink">
                                <span className={styles.passwordRecoveryLink}>
                                    Forgot Password?
                                </span>
                            </Link>

                        </div>

                        {/* Validation */}
                        <div className={styles.validation}>
                            <span>
                                { formik.touched.username && formik.errors.username }
                            </span>
                            <span>
                                { formik.touched.password && formik.errors.password }
                            </span>
                        </div>

                        {/* Login Button */}
                        <div style={{ marginTop: '50px' }} data-test="loginSubmitButton">
                            <GlowingButton>
                                Login
                            </GlowingButton>
                        </div>
                        
                    </form>

                    {/* Registration link */}
                    <div className={styles.registerLinkWrapper}>
                        <span>
                            Not yet a member? {' '}
                        </span>
                        <Link href="/register">
                            <span className={styles.registerLink}>
                                Register
                            </span>
                        </Link>
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default Home;
