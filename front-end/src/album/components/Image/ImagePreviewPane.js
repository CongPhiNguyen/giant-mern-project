import React, { useRef, useEffect, useState, createRef } from "react";
import "./ImagePreviewPane.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeAnImage,
  deleteAnImage,
  setCurrentSharedInfo,
} from "../../imageSlice";
import { toast } from "react-toastify";
import { showModal } from "../../../shared/modals/ModalSlice";

const valueChangeEnum = {
  NAME: "NAME",
  DESCRIPTION: "DESCRIPTION",
  ALT: "ALT",
};

export default function ImagePreviewPane(props) {
  const dispatch = useDispatch();
  console.log(props);

  const [ownimageInfo, setOwnimageInfo] = useState({});
  const [isEdittingName, setIsEdittingName] = useState(false);
  const [isEdittingDescription, setIsEdittingDescription] = useState(false);
  const [isEdittingAltText, setIsEdittingAltText] = useState(false);

  const userInfo = useSelector(
    (state) => state.sharedSlice.currentUserInformation
  );

  const buttonChangeGroupDOM = (valueChangeType) => {
    return (
      <div>
        {(valueChangeType === valueChangeEnum.NAME && !isEdittingName) ||
        (valueChangeType === valueChangeEnum.DESCRIPTION &&
          !isEdittingDescription) ||
        (valueChangeType === valueChangeEnum.ALT && !isEdittingAltText) ? (
          <button
            onClick={() => {
              if (valueChangeType === valueChangeEnum.NAME) {
                setIsEdittingName(true);
              } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
                setIsEdittingDescription(true);
              } else if (valueChangeType === valueChangeEnum.ALT) {
                setIsEdittingAltText(true);
              }
            }}
          >
            Change
            {valueChangeType === valueChangeEnum.NAME
              ? " name"
              : valueChangeType === valueChangeEnum.DESCRIPTION
              ? " description"
              : valueChangeType === valueChangeEnum.ALT
              ? " altText"
              : ""}
          </button>
        ) : (
          <React.Fragment>
            <button
              onClick={() => {
                changeValue(valueChangeType);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                if (valueChangeType === valueChangeEnum.NAME) {
                  setIsEdittingName(false);
                } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
                  setIsEdittingDescription(false);
                } else if (valueChangeType === valueChangeEnum.ALT) {
                  setIsEdittingAltText(false);
                }
              }}
            >
              Withdraw
            </button>
          </React.Fragment>
        )}
      </div>
    );
  };

  const inputRef = {
    name: createRef(),
    alt: createRef(),
    description: createRef(),
  };

  useEffect(() => {
    const getUserInformationByID = (id) => {
      axios.defaults.withCredentials = true;
      const url = "http://localhost:5000/api/user/";
      axios
        .get(url + id)
        .then((data) => {
          setOwnimageInfo(data.data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    if (props.imageInfo?.ownPeople)
      getUserInformationByID(props.imageInfo?.ownPeople);
  }, [props.imageInfo?.ownPeople]);

  useEffect(() => {
    setIsEdittingName(false);
  }, [props.imageInfo?._id]);

  // console.log("ownimageInfo", ownimageInfo);
  const getFatherAlbum = (fatherAlbums) => {
    if (fatherAlbums?.length === 0) {
      return props.imageInfo.imageName;
    } else return "aaa";
  };

  const deleteCurrentImage = () => {
    axios.defaults.withCredentials = true;
    const url = "http://localhost:5000/api/image";
    axios
      .delete(url, {
        params: {
          imgID: props.imageInfo?._id,
          ownUserID: props.imageInfo?.ownPeople,
          path: JSON.stringify(props.imageInfo?.imageRoot),
        },
      })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          toast.success("Delete image successfully");
          dispatch(deleteAnImage(props.imageInfo?._id));
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    props.closePreviewPane();
    props.changeIndex(-1);
  };

  const changeValue = (valueChangeType) => {
    let editValue = {};
    if (valueChangeType === valueChangeEnum.NAME) {
      const name = inputRef.name.current.value;
      if (name === props.imageInfo?.imageName) {
        toast.error("The name is not change");
        return;
      }
      editValue.imageName = name;
    } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
      const description = inputRef.description.current.value;
      if (description === props.imageInfo?.description) {
        toast.error("The description is not change");
        return;
      }
      editValue.description = description;
    } else if (valueChangeType === valueChangeEnum.ALT) {
      const alt = inputRef.alt.current.value;
      if (alt === props.imageInfo?.alt) {
        toast.error("The alt text is not change");
        return;
      }
      editValue.alt = alt;
    }
    axios.defaults.withCredentials = true;
    const url = "http://localhost:5000/api/image";
    axios
      .patch(url, {
        id: props.imageInfo?._id,
        ...editValue,
      })
      .then((data) => {
        console.log("data", data);
        if (data.data.success) {
          if (valueChangeType === valueChangeEnum.NAME) {
            toast.success("Change name successfully");
            setIsEdittingName(false);
          } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
            toast.success("Change description successfully");
            setIsEdittingDescription(false);
          } else if (valueChangeType === valueChangeEnum.ALT) {
            toast.success("Change alt text successfully");
            setIsEdittingAltText(false);
          }
          dispatch(
            changeAnImage({
              id: props.imageInfo?._id,
              value: editValue,
            })
          );
        } else {
          if (valueChangeType === valueChangeEnum.NAME) {
            toast.success("Change name failed");
          } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
            toast.success("Change description failed");
          } else if (valueChangeType === valueChangeEnum.ALT) {
            toast.success("Change alt text failed");
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        if (valueChangeType === valueChangeEnum.NAME) {
          toast.success("Change name failed");
        } else if (valueChangeType === valueChangeEnum.DESCRIPTION) {
          toast.success("Change description failed");
        } else if (valueChangeType === valueChangeEnum.ALT) {
          toast.success("Change alt text failed");
        }
      });
  };

  const changePermission = () => {
    dispatch(showModal("ImagePermission"));
    dispatch(setCurrentSharedInfo(props.imageInfo));
  };

  return (
    <CSSTransition
      in={props.display}
      timeout={200}
      classNames="slide-right"
      mountOnEnter
      unmountOnExit
    >
      <div className="preview-pane-controller">
        <div
          className="preview-pane-close noselect"
          onClick={() => props.closePreviewPane()}
        >
          X
        </div>
        <section className="information-detail information-section">
          <p className="title">Details</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">ImageName:</label>
            {!isEdittingName ? (
              <p>{props.imageInfo?.imageName ?? " Không xác định"}</p>
            ) : (
              <input
                ref={inputRef.name}
                defaultValue={props.imageInfo?.imageName}
              ></input>
            )}
          </p>
          <p className="information-concrete">
            <label className="information-label">Description:</label>
            {!isEdittingDescription ? (
              <p>{props.imageInfo?.description ?? " Không xác định"}</p>
            ) : (
              <input
                ref={inputRef.description}
                defaultValue={props.imageInfo?.description}
              ></input>
            )}
          </p>
          <p className="information-concrete">
            <label className="information-label">Alt text:</label>
            {!isEdittingAltText ? (
              <p>{props.imageInfo?.alt ?? " Không xác định"}</p>
            ) : (
              <input
                ref={inputRef.alt}
                defaultValue={props.imageInfo?.alt}
              ></input>
            )}
          </p>
        </section>
        <section className="information-attribute information-section">
          <p className="title">Attribute</p>
          <div className="divider"></div>
          <p className="information-concrete">
            <label className="information-label">Own by:</label>
            <img className="own-avatar" src={ownimageInfo?.avatarURL}></img>
            <p className="own-username">{ownimageInfo?.username || ""}</p>
          </p>

          <p className="information-concrete">
            <label className="information-label">Location:</label>
            {`${ownimageInfo?.username}/${getFatherAlbum(
              props.imageInfo?.fatherAlbums
            )}`}
          </p>
          <p className="information-concrete">
            <label className="information-label">Size:</label>
            {`${props.imageInfo?.dimension.x}x${props.imageInfo?.dimension.y}`}
          </p>
          <p className="information-concrete">
            <label className="information-label">Storage:</label>
            {props.imageInfo?.storage}
          </p>
        </section>

        {props.imageInfo?.ownPeople === userInfo._id ? (
          <React.Fragment>
            <section className="information-permission information-section">
              <p className="title">Permission</p>
              <div className="divider"></div>
              <p className="information-concrete">
                <label className="information-label">ShareList:</label>
                {props.imageInfo?.viewedPeople.length +
                  " people viewed this album" ?? ""}
              </p>
              <button onClick={() => changePermission()}>
                Change permission
              </button>
            </section>
            <section className="information-mangage information-section">
              <p className="title">Manage</p>
              <div className="divider"></div>
              <p className="information-concrete">
                <label className="information-label">View:</label>
                <Link
                  to={`/image/view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
                >
                  View with opensea
                </Link>
                <Link
                  to={`/image/simple-view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
                >
                  SimpleView
                </Link>
              </p>
              <div className="button-section">
                <div>
                  <button onClick={() => deleteCurrentImage()}>Delete</button>
                </div>
                {buttonChangeGroupDOM(valueChangeEnum.NAME)}
                {buttonChangeGroupDOM(valueChangeEnum.DESCRIPTION)}
                {buttonChangeGroupDOM(valueChangeEnum.ALT)}
              </div>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <label className="information-label">View:</label>
            <Link
              to={`/image/view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
            >
              View with opensea
            </Link>
            <Link
              to={`/image/simple-view/${props.imageInfo?.imageRoot[0]}/${props.imageInfo?.imageRoot[1]}`}
            >
              SimpleView
            </Link>
          </React.Fragment>
        )}
      </div>
    </CSSTransition>
  );
}
