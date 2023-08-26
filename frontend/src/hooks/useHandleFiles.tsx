import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FileMetaDatasFormated } from "../Dtos";
import { v4 } from 'uuid';

type UseHandleFileProps = {
  input_file_id: string,
  _file_changes: (props_file: FileMetaDatasFormated[]) => void
}

export const useHandleFile = (props: UseHandleFileProps): void => {

  const input_file_reference = useRef({} as HTMLInputElement);

  const accepted_file_types = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'video/wav'];
  const limit_file_size = 2;

  const _format_bytes = (bytes: number, just_num: boolean): string => {

    const kb_conversion = (bytes / 1024).toFixed(2);
    const mb_conversion = (bytes / 1048576).toFixed(2);
    const gb_conversion = (bytes / 1073741824).toFixed(2)

    if (bytes < 1024)
      return bytes + " Bytes";

    if (bytes < 1048576)
      return just_num ? kb_conversion : kb_conversion + "KB";

    if (bytes < 1073741824)
      return just_num ? mb_conversion : mb_conversion + "MB";

    return just_num ? gb_conversion : gb_conversion + "GB";

  }

  const get_image_base64_data = async (blob_data: Blob): Promise<string> => {

    return new Promise(resolve => {

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);

      reader.readAsDataURL(blob_data);

    })

  }

  const _handle_files_change = async (event: any): Promise<void> => {

    const files = event.target.files as FileList;
    input_file_reference.current.files = null;
    let _files = [] as FileMetaDatasFormated[];

    for (const file of files) {

      const get_file_size = _format_bytes(file.size, false);

      console.log(get_file_size);

      if (get_file_size.includes('GB')) {
        toast.error('Arquivo muito grande.');
        return;
      }

      if (get_file_size.includes('MB') && parseInt(get_file_size.split('MB')[0]) > limit_file_size) {
        toast.error('Arquivo muito grande.');
        return;
      }

      if (!accepted_file_types.includes(file.type)) {
        toast.error('Um dos arquivos selecionados não possuem tipo de extensao permitidos.');
        return;
      }

      const blob = new Blob([file], { type: file.type });

      const archive_data = await get_image_base64_data(blob);

      _files.push({
        _file_id: v4(),
        file_blob_data: archive_data,
        file_mime_type: file.type,
        file_name: file.name,
        formated_size: get_file_size,
        last_modification: file.lastModified,
        size: file.size
      })

    }

    props._file_changes(_files);

  }

  useEffect(() => {

    const element = document.getElementById(props.input_file_id) as HTMLInputElement;

    if (!element) return;

    input_file_reference.current = element;

    input_file_reference.current.addEventListener('change', _handle_files_change);

    return () => {

      input_file_reference.current.removeEventListener('change', _handle_files_change);

    }

  }, [])

}