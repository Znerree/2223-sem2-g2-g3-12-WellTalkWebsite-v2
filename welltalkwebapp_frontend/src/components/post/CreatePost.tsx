import { Card, CardContent } from "@/components/ui/card";
import AvatarInitials from "../ui/avatar-initials";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LucideImagePlus } from "lucide-react";
import axios from "@/api/axios";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { postSchema } from "@/schema-zod/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CreatePost = () => {
  const user = useAuth();
  const userInitials = user ? user.user && user.user.firstName.charAt(0) + user.user.lastName.charAt(0) : null;
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openPostModal, setOpenPostModal] = useState(false);

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
        setOpenPostModal(false);
        toast.success("Post created successfully.", {
          classNames: {
            toast: "bg-green-500",
          },
        });
      } else {
        console.log("without photo");
        await axios.post("/posts", body, config);
        setOpenPostModal(false);
        toast.success("Post created successfully.", {
          style: {
            color: "green",
          },
        });
      }
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Card className=" md:w-[700px] mx-auto mb-3">
        <CardContent className=" flex flex-row items-center px-3 py-5 gap-2">
          <AvatarInitials name={userInitials} />
          <Dialog open={openPostModal} onOpenChange={setOpenPostModal}>
            <DialogTrigger className=" w-full rounded-md">
              <Input placeholder="Post something..." className=" cursor-pointer hover:bg-gray-100 bg-gray-50" />
            </DialogTrigger>

            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className=" shrink-0">
                <LucideImagePlus className="h-6 w-6 text-gray-400" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className=" text-primary-600 text-2xl">Create post</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form className="space-y-3 max-h-[600px]" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Title" type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} placeholder="Content" className=" resize-none" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormMessage />
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
                            disabled={form.formState.isSubmitting}
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
                  <Button type="submit" className=" w-full" disabled={form.formState.isSubmitting}>
                    Post
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreatePost;
