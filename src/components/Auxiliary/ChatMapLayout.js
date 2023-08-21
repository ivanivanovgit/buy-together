// ChatMapLayout.js
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputText,
  setInputGroupText,
  incrementCountAddMarker,
  setSelectedTheme,
  setSearchButtonClick,
  setSearchInput,
  setShowAllMarkers,
  setOpenAlert,
  setShowMessage,
} from "../../redux/slices/chatSlices/chatMapSlice";
import { validateInput } from "../../utils/validateInput";
import { useRouter } from "next/router";
import {
  Divider,
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  Alert,
  Dialog,
  DialogContent,
} from "@mui/material";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {
  fetchThemes,
  checkThemeHasMarkers,
} from "../../../src/utils/endPointsHandlers";

function ChatMapLayout({ mapChat, layoutStyles }) {
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.chatMap.inputText);
  const inputGroupText = useSelector((state) => state.chatMap.inputGroupText);
  const address = useSelector((state) => state.chatMap.address);
  const selectedTheme = useSelector((state) => state.chatMap.selectedTheme);
  const isMarkerPlaced = useSelector((state) => state.chatMap.isMarkerPlaced);
  const searchButtonClick = useSelector(
    (state) => state.chatMap.searchButtonClick
  );
  const searchInput = useSelector((state) => state.chatMap.searchInput);
  const markersMesage = useSelector((state) => state.chatMap.markersMesage);
  const openAlert = useSelector((state) => state.chatMap.openAlert);
  const showMessage = useSelector((state) => state.chatMap.showMessage);
  const isAddingMarker = useSelector((state) => state.chatMap.isAddingMarker);
  // useState
  const [themes, setThemes] = useState([]);
  const [loadingtheme, setLoadingTheme] = useState(true);
  const [warnNothemeOrAdress, setWarnNothemeOrAdress] = useState("");
  const [deleteThemeError, setDeleteThemeError] = useState("");

  // useRef
  const searchInputRef = useRef(null);

  const router = useRouter();

  async function onDeleteTheme(event) {
    event.preventDefault();

    const hasMarkers = await checkThemeHasMarkers(selectedTheme);

    if (hasMarkers) {
      setDeleteThemeError(`Удалите маркеры темы перед её удалением`);
      setTimeout(() => {
        setDeleteThemeError("");
      }, 3000); // сбрасываем сообщение после 3 секунд
      return;
    }

    const newThemes = themes.filter((theme) => theme !== selectedTheme);
    setThemes(newThemes);
    dispatch(setSelectedTheme(newThemes?.length > 0 ? newThemes[0] : ""));
    setDeleteThemeError(`Тема \"${selectedTheme}\"  удалена успешно.`);
    setTimeout(() => {
      setDeleteThemeError(""); // Очищаем сообщение об ошибке при успешном удалении темы
    }, 3000); // сбрасываем сообщение после 3 секунд
  }

  // Универсальный обработчик ввода
  const handleInput = (dispatchFunction, event) => {
    let userInput = event.target.value;
    const validation = validateInput(userInput);

    if (!validation.valid) {
      dispatchFunction("");
      dispatch(setShowMessage(validation.errorMessage));
    } else {
      dispatchFunction(validation.text);
      dispatch(setShowMessage(""));
    }
  };

  const handleShowAllMarkers = (event) => {
    event.preventDefault();
    dispatch(setShowAllMarkers(true));
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    dispatch(setSearchButtonClick(searchInput));
  };

  // Обработчик события нажатия кнопки "Добавить тему"
  const handleAddThemeFormSubmit = (event) => {
    event.preventDefault();
    const themeExists = themes.some((theme) => theme === inputGroupText);

    if (!themeExists) {
      setThemes((prevThemes) => [...prevThemes, inputGroupText]);
      dispatch(setSelectedTheme(inputGroupText));
    }
  };

  // Обработчик события изменения выбранной темы в элементе select
  const handleSelectThemeChange = (event) => {
    dispatch(setSelectedTheme(event.target.value));
  };

  // Обработчик события изменения текста в поле ввода
  const handleInputChange = (event) => {
    handleInput((value) => dispatch(setInputText(value)), event);
  };

  // Обработчик события изменения текста в группе
  const handleInputGroupChange = (event) => {
    handleInput((value) => dispatch(setInputGroupText(value)), event);
  };

  const handleFormSubmitmessage = (event) => {
    event.preventDefault();
    if (selectedTheme) {
      dispatch(incrementCountAddMarker());
    }

    if (!isMarkerPlaced || !selectedTheme) {
      setWarnNothemeOrAdress("Задайте адрес и тему");
      setTimeout(() => {
        setWarnNothemeOrAdress("");
      }, 3000);
    } else {
      setWarnNothemeOrAdress("");
    }
  };

  const mapChatWithProps = React.cloneElement(mapChat, {
    searchInputRef: searchInputRef.current,
  });

  useEffect(() => {
    if (Object.keys(router?.query ?? {}).length === 0) {
      // query ещё не доступен, выходим из useEffect
      return;
    }

    let didCancel = false;

    const { theme: urlTheme } = router.query;

    const fetchAndSetThemes = async () => {
      const themesFromDB = await fetchThemes();

      if (!didCancel) {
        if (themesFromDB.includes(urlTheme)) {
          dispatch(setSelectedTheme(urlTheme));
        }
      }
    };

    fetchAndSetThemes();

    return () => {
      didCancel = true;
    };
  }, [router.query]);

  useEffect(() => {
    if (searchButtonClick) {
      dispatch(setSearchButtonClick(null));
    }
  }, [searchButtonClick]);

  useEffect(() => {
    // Если выбранная тема отсутствует в списке тем, сбросить выбранную тему
    if (selectedTheme && !themes.includes(selectedTheme)) {
      dispatch(setSelectedTheme(""));
    }
  }, [themes, selectedTheme, dispatch]);

  useEffect(() => {
    fetchThemes().then((theme) => {
      setThemes(theme);
      setLoadingTheme(false);
    });
  }, []);

  useEffect(() => {
    if (themes?.length > 0 && !selectedTheme && !loadingtheme) {
      dispatch(setSelectedTheme(themes[0]));
    }
  }, [themes, loadingtheme]);

  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.leftSide}>
        <div className={layoutStyles.searchAdressWrapper}>
          <div className={layoutStyles.searchAdressLabel}>
            1. Введите адрес в поиске или нажмите на карту
          </div>

          <form onSubmit={handleSearchButtonClick}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInput}`}
              type="text"
              name="search"
              ref={searchInputRef}
              value={searchInput}
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
              placeholder="&nbsp;&nbsp;&nbsp;Введите адрес для поиска"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, введите адрес для поиска. По данному адресу будет размещен маркер с сообщением в заданной теме."
              maxLength={200}
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Найти
            </button>
          </form>
        </div>

        <div className={layoutStyles.addressLabel}>Найденный адрес:</div>
        <div className={layoutStyles.alignVertical}>
          <div>{address}</div>
          {!isMarkerPlaced && (
            <div className={layoutStyles.addressWarning}>
              *Щелкните мышкой на карте в нужном вам месте или выберите адрес
              при помощи поиска выше
            </div>
          )}
        </div>
        <Divider />
        {/* Форма для выбора и добавления темы*/}
        <div className={layoutStyles.addDeleteThemeWrapper}>
          <div className={layoutStyles.addThemeLabel}>
            2.Выберите или добавьте тему
          </div>
          <form>
            <FormControl fullWidth size="small">
              <Select
                value={loadingtheme ? "" : selectedTheme}
                onChange={handleSelectThemeChange}
                className={`${layoutStyles.mainInput} ${layoutStyles.stretchTheme}`}
                name="themeList"
                displayEmpty
                color="thirdColor"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {!(themes?.length > 0) && (
                  <MenuItem
                    className={layoutStyles.MenuItemStyle}
                    value=""
                    disabled
                  >
                    Тема не задана
                  </MenuItem>
                )}
                {themes?.map((theme, index) => (
                  <MenuItem
                    key={index}
                    className={layoutStyles.MenuItemStyle}
                    value={theme}
                  >
                    {/* Обертываем текст элемента в ListItemText и применяем стили для переноса слов: */}
                    <ListItemText
                      primary={theme}
                      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={layoutStyles.selectedThemeWrapper}>
              <div className={layoutStyles.chosenTheme}>Выбранная тема: </div>
              <div className={layoutStyles.selectedTheme}>
                {selectedTheme}
                {selectedTheme && (
                  <CancelPresentationIcon
                    className={layoutStyles.closeIcon}
                    onClick={onDeleteTheme}
                  />
                )}
                {!selectedTheme && (
                  <div className={layoutStyles.addressWarning}>
                    *Выберите или добавьте тему
                  </div>
                )}
              </div>
            </div>

            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.showMarkersButton}`}
              onClick={handleShowAllMarkers}
            >
              Показать маркеры по всем темам
            </button>
          </form>
          <form onSubmit={handleAddThemeFormSubmit}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInputAddTheme}`}
              type="text"
              name="filterTheme"
              value={inputGroupText}
              onChange={handleInputGroupChange}
              placeholder="&nbsp;&nbsp;&nbsp;Введите тему для добавления"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, добавьте тему. По данной теме вы сможете добавить маркеры с сообщением или посмотреть другие маркеры с данной тематикой. Удалить тему можно только после удаления маркеров. Длина темы не должна превышать 100 символов."
              maxLength={100}
              required
            />
            <div className={layoutStyles.delAddThemeButtonsWrapper}>
              <button className={layoutStyles.mainButtonStyle} type="submit">
                Добавить тему
              </button>
            </div>
          </form>
        </div>
        <Divider />
        {/* Форма для ввода текста сообщений и добавления маркера */}
        <div className={layoutStyles.addMessageWithMarker}>
          <div className={layoutStyles.addMessageWithMarkerLabel}>
            3. Добавьте сообщение на карту
          </div>
          <form onSubmit={handleFormSubmitmessage}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.addMessageWithMarkerInput}`}
              type="text"
              name="message"
              value={inputText}
              onChange={handleInputChange}
              placeholder="&nbsp;&nbsp;&nbsp;Введите сообщение"
              pattern="^[^<>]*\S[^<>]*$"
              title="Пожалуйста, введите сообщение. Данное сообщение будет у добавленного вами маркера. Длина сообщения не должна превышать 300 символов."
              maxLength={300}
              required
            />
            <button
              className={layoutStyles.mainButtonStyle}
              type="submit"
              disabled={isAddingMarker}
            >
              Добавить на карту
            </button>
          </form>
        </div>
        {warnNothemeOrAdress && (
          <div className={layoutStyles.chatError}>{warnNothemeOrAdress}</div>
        )}
        {deleteThemeError && (
          <div className={layoutStyles.chatError}>{deleteThemeError}</div>
        )}
        {markersMesage && (
          <div className={layoutStyles.chatError}>{markersMesage}</div>
        )}
        {showMessage && (
          <div className={layoutStyles.chatError}>{showMessage}</div>
        )}
        <Dialog open={openAlert} onClose={() => dispatch(setOpenAlert(false))}>
          <DialogContent>
            <Alert
              severity="error"
              onClose={() => dispatch(setOpenAlert(false))}
            >
              Маркера с заданной темой и сообщением не существует
            </Alert>
          </DialogContent>
        </Dialog>
      </div>
      <div className={layoutStyles.rightSide}>
        <div className={layoutStyles.forMap}>{mapChatWithProps}</div>
      </div>
    </div>
  );
}

export default ChatMapLayout;
