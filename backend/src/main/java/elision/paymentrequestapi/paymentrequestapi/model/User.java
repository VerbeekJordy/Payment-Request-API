package elision.paymentrequestapi.paymentrequestapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(generator = "sequence-generator")
    @GenericGenerator(
            name = "sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "user_sequence"),
                    @Parameter(name = "initial_value", value = "5"),
                    @Parameter(name = "increment_size", value = "1")
            })
    private long id;
    @Column
    private String email;
    @Column
    @JsonIgnore
    private String password;
    @Column
    private String fullName;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "USER_ROLES", joinColumns = {
            @JoinColumn(name = "USER_ID")}, inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")})
    private Set<Role> roles;

    public User() {
    }

    public User(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
    }

  public User(String email, String password, String fullName, Set<Role> roles) {
      this.email = email;
      this.password = password;
      this.fullName = fullName;
      this.roles = roles;
  }

    public User(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}