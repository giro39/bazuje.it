import { Link } from "react-router-dom";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";

const UserTag = ({ user, userId }) => {
    return (
        <Link to={`/profile/${userId}`} style={{ textDecoration: "none" }}>
            <div className={styles.userTag}>
                <UserProfileIcon user={user} />
                <p className={styles.userName}>{user}</p>
            </div>
        </Link>
    );
};

export default UserTag;
