BRANCH_NAME=$(git branch --show-current)
BUILD_DIR="./dist/${BRANCH_NAME}/"
echo Deploying website! Make sure it has been built! Verifying...
if [ -d "${BUILD_DIR}" ];then
  echo

  echo deploying website from branch ${BRANCH_NAME}
  git subtree push --prefix dist origin deployment

else
  echo "Warning could not find build at '${BUILD_DIR}' !. Aborting...!"
fi
