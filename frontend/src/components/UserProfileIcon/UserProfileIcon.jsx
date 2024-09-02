import styles from "../../styles/components/UserProfileIcon/UserProfileIcon.module.scss";

const UserProfileIcon = ({ user }) => {
    return (
        <div className={styles.userImage}>
            <p className={styles.userFirstLetter}>{user[0].toUpperCase()}</p>
        </div>
    );
};

export default UserProfileIcon;
