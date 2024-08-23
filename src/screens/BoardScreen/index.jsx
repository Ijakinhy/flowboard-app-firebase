import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "../../components/layout/AppLoader";
import { fetchBoard } from "../../slices/boardDataSlice";
import BoardInterface from "./BoardInterface";
import BoardTopBar from "./BoardTopBar";
const BoardScreen = () => {
  const { boardId } = useParams();
  const { boardData, lastUpdated, data, loading } = useSelector(
    (state) => state.boardData
  );

  const { boards, areBoardsFetch } = useSelector((state) => state.boards);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleBoard = useMemo(
    () => boards.find((board) => board.id === boardId),
    []
  );

  const boardDataList = useMemo(() => {
    return data;
  }, [data]);

  const handleFetchBoard = async () => {
    try {
      dispatch(fetchBoard({ uid: currentUser.uid, boardId: singleBoard?.id }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!areBoardsFetch || !singleBoard) navigate("/boards");
    else {
      handleFetchBoard();
    }
  }, []);

  if (loading) return <AppLoader />;
  return (
    <>
      <BoardTopBar name={singleBoard?.name} color={singleBoard?.color} />
      <BoardInterface boardId={singleBoard?.id} boardData={boardDataList} />
    </>
  );
};

export default BoardScreen;
