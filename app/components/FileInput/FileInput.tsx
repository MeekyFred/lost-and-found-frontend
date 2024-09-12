"use client";

import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'; // prettier-ignore
import type { ChangeEvent, FC } from "react";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import { baseURL } from "@/app/config";
import { images } from "@/app/constants";
import { InputState, initialState, Action } from "@/app/types/file-input";
import axiosInstance from "@/app/utils/axios";

import "./FileInput.scss";

function reducerFn(state: InputState, action: Action): InputState {
  switch (action.type) {
    case "SET_FILE":
      return { ...state, file: action.payload };
    case "SET_FILE_NAME":
      return { ...state, fileName: action.payload };
    case "SET_UPLOAD_VIEW":
      return { ...state, uploadView: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_URL":
      return { ...state, url: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

type Props = {
  id: string;
  name: string;
  inputState: InputState | null;
  setInputState: any;
};

const FileInput: FC<Props> = ({ id, name, inputState, setInputState }) => {
  const [fileState, dispatch] = useReducer(reducerFn, initialState);
  const [content, setContent] = useState<any>("upload");

  const fileInput = useRef<HTMLInputElement>(null);
  const controller = useMemo(() => new AbortController(), []);
  const signal = controller.signal;

  // prettier-ignore
  const setFile = (file: File | null) => dispatch({ type: 'SET_FILE', payload: file });
  // prettier-ignore
  const setFileName = (fileName: string) => dispatch({ type: 'SET_FILE_NAME', payload: fileName });
  // prettier-ignore
  const setUploadView = (uploadView: string) => dispatch({ type: 'SET_UPLOAD_VIEW', payload: uploadView });
  // prettier-ignore
  const setProgress = (progress: number) => dispatch({ type: 'SET_PROGRESS', payload: progress });
  // prettier-ignore
  const setUrl = (url: string) => dispatch({ type: 'SET_URL', payload: url });

  useEffect(() => {
    if (!inputState) return;

    setFile(inputState.file);
    setFileName(inputState.fileName);
    setUploadView(inputState.uploadView);
    setUrl(inputState.url!);
    setProgress(inputState.progress);
  }, [inputState]);

  // prettier-ignore
  const handleChooseFile = useMemo(() => async () => {
    if (fileInput.current) fileInput.current.click();
  }, [fileInput]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadView("uploading");
    setInputState((prev: InputState) => ({ ...prev, uploadView: "uploading" }));

    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) return;
    if (file.name === undefined || file.name === null) return;
    if (file.size > 10485760) return;

    const fileName = file.name;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("file_name", fileName);

    const onUploadProgress = (data: any) => {
      //Set the progress value to show the progress bar
      setProgress(Math.round((100 * data.loaded) / data.total));
    };

    const config = {
      signal,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    };

    const res = await axiosInstance.post(`${baseURL}/uploads/file`, formData, config); // prettier-ignore

    if (res) {
      setFile(file);
      setFileName(file.name);
      setUploadView("selected");
      setUrl(res.data.data.url);

      const updated: InputState = {
        file,
        fileName: file.name,
        uploadView: "selected",
        progress: 100,
        url: res.data.data.path,
      };

      setInputState(updated);
    }
  };

  const handleResetInput = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (!input) return;
    input.value = "";
  };

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    setInputState(null);
    handleResetInput();
  };

  const upload = useMemo(
    () => (
      <div className="file upload app__flex" onClick={handleChooseFile}>
        <Image src={images.uploadIcon} alt="upload" />
        <p>Click to upload image</p>
      </div>
    ),
    [handleChooseFile]
  );

  const selected = useMemo(
    () => (
      <div className="file selected">
        <div className="left-part">
          <Image src={images.fileIcon} alt="file" />
          <p>{fileState.fileName}</p>
        </div>

        <div className="right-part" onClick={handleCancel}>
          <MdOutlineCancel />
        </div>
      </div>
    ),
    [fileState.fileName] // eslint-disable-line
  );

  const uploading = useMemo(
    () => (
      <div className="file uploading">
        <CircularProgress value={fileState.progress} color="#FF8E31">
          <CircularProgressLabel>{`${fileState.progress}%`}</CircularProgressLabel>
        </CircularProgress>
        <p>Uploading file ...</p>
      </div>
    ),
    [fileState.progress]
  );

  useEffect(() => {
    if (inputState) {
      switch (inputState.uploadView) {
        case "upload":
          setContent(upload);
          break;

        case "uploading":
          setContent(uploading);
          break;

        case "selected":
          setContent(selected);
          break;

        default:
          setContent(upload);
          break;
      }
    } else {
      switch (fileState.uploadView) {
        case "upload":
          setContent(upload);
          break;

        case "uploading":
          setContent(uploading);
          break;

        case "selected":
          setContent(selected);
          break;

        default:
          setContent(upload);
          break;
      }
    }
  }, [fileState, inputState, selected, upload, uploading]);

  return (
    <div className="app__file__input">
      <input
        type="file"
        name={name}
        id={id}
        accept=".png,.jpg,.jpeg,.gif"
        multiple={false}
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />

      {content}
      <p className="file__info">JPG, JPEG, PNG, and GIF, File size: ~5MB</p>
    </div>
  );
};

export default FileInput;
