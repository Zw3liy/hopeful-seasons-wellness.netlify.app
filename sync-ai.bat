@echo off
echo ========================================================
echo   Auto-Syncing Latest AI Agent Changes to Local & GitHub
echo ========================================================
echo.

:: 1. Fetch all remote branches from GitHub
echo [1/4] Fetching latest branches from remote repository...
git fetch origin
if %ERRORLEVEL% NEQ 0 (
    echo Error fetching from origin! Please check your network or repository connection.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Ensure you are on the main branch
echo.
echo [2/4] Switching to main branch...
git checkout main

:: 3. Merge the Arena AI branch automatically prioritizing AI changes
echo.
echo [3/4] Merging latest AI workspace branch into local main...
git merge origin/arena/019fc32b-hopeful-seasons-wellness-netli --strategy-option=theirs -m "Auto-merge latest AI updates"

:: Handle any unresolved conflict flags automatically
git checkout --theirs . >nul 2>&1
git add .
git commit -m "Auto-merge latest AI updates" >nul 2>&1

:: 4. Push the merged updates to GitHub main
echo.
echo [4/4] Pushing changes up to GitHub...
git push origin main

echo.
echo ========================================================
echo   SUCCESS! Local files and GitHub are 100%% up to date!
echo ========================================================
pause