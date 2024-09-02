import styles from "../../styles/components/Opinion/Opinion.module.scss";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";

const UserTag = ({ user }) => {
    return (
        <div className={styles.userTag}>
            <UserProfileIcon user={user} />
            <p className={styles.userName}>{user}</p>
        </div>
    );
};

export default UserTag;
