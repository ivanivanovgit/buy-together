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
      setDeleteThemeError(`Remove the theme markers before deleting it.`);
      setTimeout(() => {
        setDeleteThemeError("");
      }, 3000);
      return;
    }

    const newThemes = themes.filter((theme) => theme !== selectedTheme);
    setThemes(newThemes);
    dispatch(setSelectedTheme(newThemes?.length > 0 ? newThemes[0] : ""));
    setDeleteThemeError(
      `The theme \"${selectedTheme}\"   has been successfully deleted.`
    );
    setTimeout(() => {
      setDeleteThemeError("");
    }, 3000);
  }

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

  const handleAddThemeFormSubmit = (event) => {
    event.preventDefault();
    const themeExists = themes.some((theme) => theme === inputGroupText);

    if (!themeExists) {
      setThemes((prevThemes) => [...prevThemes, inputGroupText]);
      dispatch(setSelectedTheme(inputGroupText));
    }
  };

  const handleSelectThemeChange = (event) => {
    dispatch(setSelectedTheme(event.target.value));
  };

  const handleInputChange = (event) => {
    handleInput((value) => dispatch(setInputText(value)), event);
  };

  const handleInputGroupChange = (event) => {
    handleInput((value) => dispatch(setInputGroupText(value)), event);
  };

  const handleFormSubmitmessage = (event) => {
    event.preventDefault();
    if (selectedTheme) {
      dispatch(incrementCountAddMarker());
    }

    if (!isMarkerPlaced || !selectedTheme) {
      setWarnNothemeOrAdress("Specify the address and theme.");
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
            1. Enter the address in the search or click on the map
          </div>

          <form onSubmit={handleSearchButtonClick}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInput}`}
              type="text"
              name="search"
              ref={searchInputRef}
              value={searchInput}
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
              placeholder="&nbsp;&nbsp;&nbsp;Enter the address for search"
              pattern="^[^<>]*\S[^<>]*$"
              title="Please enter an address for search. A marker with a message in the specified topic will be placed at this address."
              maxLength={200}
              required
            />
            <button className={layoutStyles.mainButtonStyle} type="submit">
              Search
            </button>
          </form>
        </div>

        <div className={layoutStyles.addressLabel}>Found address:</div>
        <div className={layoutStyles.alignVertical}>
          <div>{address}</div>
          {!isMarkerPlaced && (
            <div className={layoutStyles.addressWarning}>
              *Click on the map at the desired location or select an address
              using the search above
            </div>
          )}
        </div>
        <Divider />

        <div className={layoutStyles.addDeleteThemeWrapper}>
          <div className={layoutStyles.addThemeLabel}>
            2. Select or add a theme
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
                    Theme is not set
                  </MenuItem>
                )}
                {themes?.map((theme, index) => (
                  <MenuItem
                    key={index}
                    className={layoutStyles.MenuItemStyle}
                    value={theme}
                  >
                    <ListItemText
                      primary={theme}
                      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={layoutStyles.selectedThemeWrapper}>
              <div className={layoutStyles.chosenTheme}>Selected theme: </div>
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
                    *Select or add a theme
                  </div>
                )}
              </div>
            </div>

            <button
              className={`${layoutStyles.mainButtonStyle} ${layoutStyles.showMarkersButton}`}
              onClick={handleShowAllMarkers}
            >
              Show markers for all themes
            </button>
          </form>
          <form onSubmit={handleAddThemeFormSubmit}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.stretchInputAddTheme}`}
              type="text"
              name="filterTheme"
              value={inputGroupText}
              onChange={handleInputGroupChange}
              placeholder="&nbsp;&nbsp;&nbsp;Enter a theme to add"
              pattern="^[^<>]*\S[^<>]*$"
              title="Please add a theme. Under this theme, you can add markers with messages or view other markers related to this topic. A theme can only be deleted after its markers are removed. The theme length should not exceed 100 characters."
              maxLength={100}
              required
            />
            <div className={layoutStyles.delAddThemeButtonsWrapper}>
              <button className={layoutStyles.mainButtonStyle} type="submit">
                Add a theme
              </button>
            </div>
          </form>
        </div>
        <Divider />

        <div className={layoutStyles.addMessageWithMarker}>
          <div className={layoutStyles.addMessageWithMarkerLabel}>
            3. Add a message to the map
          </div>
          <form onSubmit={handleFormSubmitmessage}>
            <input
              className={`${layoutStyles.mainInput} ${layoutStyles.addMessageWithMarkerInput}`}
              type="text"
              name="message"
              value={inputText}
              onChange={handleInputChange}
              placeholder="&nbsp;&nbsp;&nbsp;Enter a message"
              pattern="^[^<>]*\S[^<>]*$"
              title="Please enter a message. This message will be for the marker you add. The message length should not exceed 300 characters."
              maxLength={300}
              required
            />
            <button
              className={layoutStyles.mainButtonStyle}
              type="submit"
              disabled={isAddingMarker}
            >
              Add to the map
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
              There is no marker with the specified theme and message
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
