import os
import pandas as pd
from pptx import Presentation

def extract_song_data(pptx_path):
    """
    Extracts song data from a single PPTX file.

    Parameters:
        pptx_path (str): Path to the PPTX file.

    Returns:
        dict: A dictionary with keys 'Song_name', 'Song_lyrics', 'Song_category'.
    """
    try:
        prs = Presentation(pptx_path)
    except Exception as e:
        print(f"Error opening {pptx_path}: {e}")
        return None

    song_data = {
        'Song_name': '',
        'Song_lyrics': '',
        'Song_category': ''
    }

    for slide in prs.slides:
        # Extract the title (Song_name)
        title = slide.shapes.title
        if title and title.text:
            song_data['Song_name'] = title.text.strip()

        # Extract the content
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            text = shape.text_frame.text
            if 'Song_lyrics:' in text:
                lyrics = text.split('Song_lyrics:')[1].strip()
                song_data['Song_lyrics'] = lyrics
            elif 'Song_category:' in text:
                classification = text.split('Song_category:')[1].strip()
                song_data['Song_category'] = classification

    return song_data

def main():
    # Define paths
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    pptx_dir = os.path.join(project_root, 'data', 'pptx')
    output_dir = os.path.join(project_root, 'data', 'output')
    output_csv = os.path.join(output_dir, 'songs.csv')

    print(f"Project Root: {project_root}")
    print(f"PPTX Directory: {pptx_dir}")
    print(f"Output Directory: {output_dir}")
    print(f"Output CSV: {output_csv}")

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Initialize list to hold all song data
    all_songs = []

    # Check if pptx_dir exists
    if not os.path.exists(pptx_dir):
        print(f"Error: The directory {pptx_dir} does not exist.")
        return

    # List all PPTX files
    pptx_files = [f for f in os.listdir(pptx_dir) if f.lower().endswith('.pptx')]
    if not pptx_files:
        print(f"No PPTX files found in {pptx_dir}.")
        return

    print(f"Found {len(pptx_files)} PPTX files to process.")

    # Iterate over all PPTX files in pptx_files/
    for filename in pptx_files:
        pptx_path = os.path.join(pptx_dir, filename)
        print(f"Processing file: {filename}")
        song = extract_song_data(pptx_path)
        if song:
            if song['Song_name']:
                all_songs.append(song)
                print(f"Extracted: {song['Song_name']}")
            else:
                print(f"Warning: 'Song_name' not found in {filename}")
        else:
            print(f"Failed to extract data from {filename}")

    # Check if any songs were extracted
    if not all_songs:
        print("No song data was extracted. Please check the PPTX files' structure.")
        return

    # Create a DataFrame
    df = pd.DataFrame(all_songs, columns=['Song_name', 'Song_lyrics', 'Song_category'])

    # Save to CSV
    try:
        df.to_csv(output_csv, index=False, encoding='utf-8-sig')  # 'utf-8-sig' for proper encoding in Excel
        print(f"\nAll data has been successfully saved to {output_csv}")
    except Exception as e:
        print(f"Error saving CSV file: {e}")

if __name__ == "__main__":
    main()
