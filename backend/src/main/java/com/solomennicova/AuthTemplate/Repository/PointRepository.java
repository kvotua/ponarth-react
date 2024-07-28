package com.solomennicova.AuthTemplate.Repository;

import com.solomennicova.AuthTemplate.Entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
}
