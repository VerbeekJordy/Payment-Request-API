package elision.paymentrequestapi.paymentrequestapi.service;

import elision.paymentrequestapi.paymentrequestapi.model.Role;
import elision.paymentrequestapi.paymentrequestapi.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private static RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findRoleByName(String name){
        return roleRepository.getRoleByName(name);
    }

}
