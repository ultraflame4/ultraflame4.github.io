#! python3
import os
import sys
import shutil

print("Starting deployment of website")

branch_name = os.popen("git branch --show-current").read().strip()
deploy_dir = f"builds/{branch_name}"
gh_pages_branch = "deploy-please"

print(f"Deploying Current Branch ( '{branch_name}' )")

print("Searching for dist folder...")
if not os.path.exists("dist"):
    print("dist folder not found")
    sys.exit(1)

print(f"Copying dist folder to {deploy_dir}")

shutil.copytree("./dist",deploy_dir,dirs_exist_ok=True)

print("Finished copying of dist folder")
print(os.popen(f'git add "./{deploy_dir}/*"').read())
print("Commiting...")
print(os.popen(f"git commit -m \"deploying {branch_name}\"").read())

print("Deploying to github pages...")
print(os.popen(f"git subtree push --prefix builds origin {gh_pages_branch}").read())

os.system("pause")