import React, { ChangeEvent, useState } from "react";

type NameAndRenamePropsType = {
  name: string;
  callBack: (newName: string) => void;
};

const NameAndRename: React.FC<NameAndRenamePropsType> = ({ name, callBack }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };

  const rename = () => {
    callBack(newName);
    changeHandler();
  };

  const changeHandler = () => setEditMode(!editMode);
  return editMode ? (
    <input value={newName} onChange={onChangeHandler} onBlur={rename} autoFocus />
  ) : (
    <span onDoubleClick={changeHandler}>{name}</span>
  );
};

export default NameAndRename;
