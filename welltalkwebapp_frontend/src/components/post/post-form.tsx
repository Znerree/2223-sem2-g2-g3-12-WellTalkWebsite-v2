import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { postSchema } from "../../schema-zod/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "@/api/axios";

const PostForm = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      photoData: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgError(null);
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };

      if (file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        setImgError("File type not supported");
      }
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (selectedFile) formData.append("photoData", selectedFile);
    console.log(formData);

    const body = {
      title: data.title,
      content: data.content,
    };

    const config = {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    };

    try {
      if (data.photoData[0]) {
        console.log("with photo");
        await axios.post("/posts/photo", formData, config);
        window.location.reload();
      } else {
        console.log("without photo");
        await axios.post("/posts", body, config);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-3 max-h-[600px]" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Title" type="text" />
                </FormControl>
                {form.formState.errors.title && <FormMessage>{form.formState.errors.title.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Content" className=" resize-none" />
                </FormControl>
                {form.formState.errors.content && <FormMessage>{form.formState.errors.content.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoData"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Photo"
                    type="file"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFileChange(e);
                    }}
                  />
                </FormControl>
                {imgError && <FormMessage>{imgError}</FormMessage>}
              </FormItem>
            )}
          />
          {photoPreview && !imgError && (
            <span className="border-2 w-full h-80 flex items-center">
              <img src={photoPreview} className="rounded-md p-2 mx-auto h-80" alt="preview" />
            </span>
          )}
          <Button type="submit" className=" w-full" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
