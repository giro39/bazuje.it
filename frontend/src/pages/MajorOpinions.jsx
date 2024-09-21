import { useParams } from "react-router-dom";
import MajorPageTopper from "../components/BasicComponents/MajorPageTopper/MajorPageTopper";
import Opinion from "../components/Opinion/Opinion";
import AddOpinion from "../components/AddOpinion/AddOpinion";
import PortalBox from "../components/PortalBox";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "../styles/pages/MajorOpinions.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const MajorOpinions = () => {
    const { majorId } = useParams();
    const [opinions, setOpinions] = useState([]);
    const [majorInfo, setMajorInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [opinionToEdit, setOpinionToEdit] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access");
                let user = null;
                if (token) {
                    user = jwtDecode(token).user_id;
                }

                const [opinionsResponse, majorInfoResponse] = await Promise.all(
                    [
                        axios.post(`${SERVER_URL}/api/all_opinions/`, {
                            kierunek: majorId,
                            user: user,
                        }),
                        axios.post(`${SERVER_URL}/api/chosen_kierunek/`, {
                            inputData: majorId,
                        }),
                    ]
                );

                setOpinions(opinionsResponse.data);
                console.log(opinionsResponse.data);
                setMajorInfo(majorInfoResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [majorId]);

    const handleDelete = (deletedOpinionId) => {
        setOpinions((prevOpinions) =>
            prevOpinions.filter(
                (opinion) => opinion.opinia !== deletedOpinionId
            )
        );
        window.location.reload(false);
    };

    const handleEdit = (opinion) => {
        setOpinionToEdit(opinion);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setOpinionToEdit(null);
    };

    const handleOpinionUpdate = (updatedOpinion) => {
        setOpinions((prevOpinions) =>
            prevOpinions.map((opinion) =>
                opinion.opinia === updatedOpinion.opinia
                    ? updatedOpinion
                    : opinion
            )
        );
    };

    const allOpinions = opinions.map((opinion, index) => (
        <Opinion
            key={index}
            text={opinion.text}
            rating={opinion.rating}
            grade={opinion.grade}
            user={opinion.user}
            opinionId={opinion.opinia}
            loggedUserRating={opinion.loggedUserRating}
            edited={opinion.edited}
            onDelete={handleDelete}
            onEdit={() => handleEdit(opinion)}
        />
    ));

    return (
        <div className={styles.container}>
            {majorInfo.kierunek && (
                <MajorPageTopper
                    chosenMajor={{
                        id: majorInfo.kierunekId,
                        kierunek: majorInfo.kierunek,
                        uczelnia: majorInfo.uczelnia,
                    }}
                />
            )}
            <p className={styles.opinionsOfStudents}>Opinie studentów</p>
            <div className={styles.opinionsContainer}>{allOpinions}</div>

            <PortalBox>
                <AddOpinion
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    majorId={majorId}
                    majorName={majorInfo.kierunek}
                    opinionToEdit={opinionToEdit}
                    onOpinionUpdated={handleOpinionUpdate}
                />
            </PortalBox>
        </div>
    );
};

export default MajorOpinions;
