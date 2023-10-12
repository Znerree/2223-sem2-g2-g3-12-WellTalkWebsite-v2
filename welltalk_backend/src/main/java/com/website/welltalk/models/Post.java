package com.website.welltalk.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")
    private byte[] photoContent;

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = false)
    private Counselor counselor;

    // general constructor
    public Post() {
    }

    // constructor with photo
    public Post(String title, String content, byte[] photoContent) {
        this.title = title;
        this.content = content;
        this.photoContent = photoContent;
    }

    // constructor without photo
    public Post(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public byte[] getPhotoContent() {
        return photoContent;
    }

    public Counselor getCounselor() {
        return counselor;
    }


    // setters
    public void setTitle(String title) {
        this.title = title;
    }

    public void setPhotoContent(byte[] photoContent) {
        this.photoContent = photoContent;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }

}
