import os

def merge_files(input_folder, output_file):
    with open(output_file, 'w', encoding='utf-8') as output:
        for foldername, subfolders, filenames in os.walk(input_folder):
            # Exclude the '.git' folder
            if '.git' in subfolders:
                subfolders.remove('.git')
                
            for filename in filenames:
                # Skip files with '.git' in their name
                if '.git' not in filename:
                    file_path = os.path.join(foldername, filename)
                    with open(file_path, 'rb') as file:
                        output.write(f"File Path: {file_path}\n")
                        content = file.read().decode('utf-8', errors='ignore')
                        output.write(content)
                        output.write('\n\n')



if __name__ == "__main__":
    # folder path which contains all the files is current folder (projectII)
    input_folder = os.getcwd() + "/projectII"
    # output file path same as current directory with name output.txt
    output_file = os.getcwd() + "/projectII/output.txt"
    merge_files(input_folder, output_file)